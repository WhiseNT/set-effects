//priority:100

/**
 * 
 * @param {Internal.Entity_} entity 
 * @param {String} eventType
 * @returns 
 */
function triggerSetEffects(entity,eventType,event) {
    if (entity == null || entity.level.isClientSide()) return
    let countsMap = {}
    let setsToTrigger = []
    let allSlots = SetRangeManager.getSlots(entity)
    allSlots.forEach((type,slots)=>{
        for (let item of slots) {
            //如果物品在对应槽位的黑名单中,则跳过
            if (SetRangeManager.inBlacklist(item,type)) continue
            let sets = map.itemMap[item.id]
            if (sets != undefined) {
                for (let set of sets) {
                    if (countsMap[set.id] == undefined) countsMap[set.id] = 1;
                    countsMap[set.id] += 1;
                    if (countsMap[set.id] === set.counts) {
                        setsToTrigger.push(set)
                    }
                } 
            } else continue;
        }
    })
    
    if (setsToTrigger.length === 0) return
    for (const set of setsToTrigger) {
        set.triggerFactory(eventType, event, set)
    }
}
/**
 * 
 * @param {Internal.LivingHurtEvent_} event 
 */
global.SetEffectsHurt = function(event) {
    triggerSetEffects(event.entity,'hurt',event)
}
/**
 * 
 * @param {Internal.LivingAttackEvent_} event 
 */
global.SetEffectsAttack = function(event) {
    triggerSetEffects(event.source.actual,'attack',event)
}
/**
 * 
 * @param {Internal.LivingEquipmentChangeEvent_} event 
 */
global.SetEffectsEquipt = function(event) {
    equiptTrigger(event)
    unequiptTrigger(event)
}
/**
 * 
 * @param {Internal.LivingEquipmentChangeEvent_} event 
 * @returns 
 */
function equiptTrigger(event) {
    if (!event.entity.level.clientSide) {
        let countsMap = Utils.newMap()
        let setsToTrigger = []
        let equiptArmor = event.to.id
        let flag = false
        let allSlots = SetRangeManager.getSlots(event.entity)
        allSlots.forEach((type,slots)=>{
            for (const item of slots) {
                if (SetRangeManager.inBlacklist(item,type)) continue
                if (item.id != equiptArmor) {
                    let sets = map.itemMap[item.id];
                    if (sets != undefined) {
                        sets.forEach(set => { 
                            if (countsMap[set.id] == undefined) {
                                countsMap[set.id] = 1
                            } else {
                                countsMap[set.id] += 1;
                            }
                        })
                    }
                } else {
                    flag = true
                }
            }
        })
        let sets = map.itemMap[equiptArmor]
        if (sets == undefined) return
        if (!flag) return
        sets.forEach(set => { 
            if (countsMap[set.id] == undefined) countsMap[set.id] = 1; else {
                countsMap[set.id] += 1;
            }
            if (countsMap[set.id] === set.counts) {
                setsToTrigger.push(set)
            }
        })
        setsToTrigger.forEach(set => {
            set.triggerFactory('equipt',event,set)
            if (set.potionEffects.length > 0) {
                for (let effect of set.potionEffects) {
                    event.entity.potionEffects.add(effect.mobEffect,-1,effect.amplifier,
                        effect.ambient,effect.showParticles)
                    if (event.entity.potionEffects.isActive(effect.mobEffect)) {
                        event.entity.removeEffect(effect.mobEffect)
                        event.entity.potionEffects.add(effect.mobEffect,-1,effect.amplifier,
                            effect.ambient,effect.showParticles)
                    }
                }
            }
            if (set.attributes) {
                for (const obj of set.attributes) {
                    if (!event.entity.getAttribute(obj.attribute).hasModifier(obj.modifier)) {
                        event.entity.getAttribute(obj.attribute).addPermanentModifier(obj.modifier)
                    } else {
                        let amount = event.entity.getAttribute(obj.attribute).getModifier(obj.uuid).amount
                        if (obj.modifier.amount > amount) {
                            event.entity.getAttribute(obj.attribute).removePermanentModifier(obj.uuid)
                            event.entity.getAttribute(obj.attribute).addPermanentModifier(obj.modifier)
                        }
                    }
                    
                }
            }
            
        })
    }
}
/**
 * 
 * @param {Internal.LivingEquipmentChangeEvent_} event 
 */
function unequiptTrigger(event) {
    if (!event.entity.level.clientSide) {
        let countsMap = Utils.newMap(); // 记录每个套装的计数
        let setsContain = []
        let setsToTrigger = []; // 存储需要触发的套装对象
        let unequiptArmor = event.from.id; // 脱下的装备 ID
        let flag = false
        let allSlots = SetRangeManager.getSlots(event.entity)
        allSlots.forEach((type,slots)=>{
            for (const item of slots) {
                if (SetRangeManager.inBlacklist(item,type)) continue
                if (item.id != unequiptArmor) {
                    // 处理仍然装备的装备
                    let sets = map.itemMap[item.id];
                    if (sets != undefined) {
                        sets.forEach(set => {
                            if (!countsMap[set.id]) countsMap[set.id] = 0;
                            countsMap[set.id] += 1;
                            if (countsMap[set.id] === set.counts) {
                                setsContain.push(set)
                            }
                        });
                    }
                } else {
                    flag = true
                }
            }
        })
        
        let sets = map.itemMap[unequiptArmor];
        if (sets == undefined) return;
        if (flag) return
        
        sets.forEach(set => {
            if (countsMap[set.id] == undefined) countsMap[set.id] = 0;
            if (countsMap[set.id] + 1 === set.counts) {
                setsToTrigger.push(set)
            }
        })
        setsToTrigger.forEach(set => {
            set.triggerFactory('unequipt', event, set);
            if (set.potionEffects.length > 0) {
                for (const effect of set.potionEffects) {
                    event.entity.removeEffect(effect.mobEffect)
                    for (const st of setsContain) {
                        for (const ef of st.potionEffects) {
                            if (ef.mobEffect == effect.mobEffect) {
                                event.entity.potionEffects.add(
                                    ef.mobEffect,-1,ef.amplifier,ef.ambient,ef.showParticles)
                            }
                        }
                    }
                }
            }
            for (const obj of set.attributes) {
                
                event.entity.getAttribute(obj.attribute).removePermanentModifier(obj.uuid)
            }
        })
    }
}
/**
 * 
 * @param {Internal.LivingEvent$LivingTickEvent_} event 
 */
global.SetEffectsTick = function(event) {
    if (Shared && !Shared.enableTick) return
    if (event.entity.isPlayer()) {
        triggerSetEffects(event.entity,'tick',event)
    }
}
EntityEvents.spawned(event=>{
    if (event.entity.isLiving()) {
        triggerSetEffects(event.entity,'unequipt',event)
    }
})
/**
 * 
 * @param {Internal.LivingHealEvent_} event 
 */
global.SetEffectsHeal = function(event) {
    if (event.entity.isPlayer()) {
        triggerSetEffects(event.entity,'heal',event)
    }
}
/**
 * 
 * @param {Internal.LivingEvent$LivingJumpEvent_} event 
 */
global.SetEffectsJump = function(event) {
    if (event.entity.isPlayer()) {
        triggerSetEffects(event.entity,'jump',event)
    }
}
/**
 * 
 * @param {Internal.LivingFallEvent_} event 
 */
global.SetEffectsFall = function(event) {
    if (event.entity.isPlayer()) {
        triggerSetEffects(event.entity,'fall',event)
    }
}
/**
 * 
 * @param {Internal.LivingDeathEvent_} event 
 */
global.SetEffectsDeath = function(event) {
    if (event.entity.isPlayer()) {
        triggerSetEffects(event.entity,'death',event)
    }
}