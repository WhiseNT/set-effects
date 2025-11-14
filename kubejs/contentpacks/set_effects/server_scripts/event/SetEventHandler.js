//priority:101
/**
 * 检查实体当前穿戴/持有的物品，找出所有满足激活条件的套装
 * @param {Internal.Entity_} entity
 * @returns {EffectiveSet[]} 满足激活条件的套装数组（每个 set 至少有 set.counts 件被装备且不在黑名单中）
 */

function getActivatedSets(entity) {
    if (entity == null || entity.level.isClientSide()) {
        return [];
    }
    const countsMap = {};
    const activatedSets = [];
    if (SetRangeManager === undefined) {
        return activatedSets;
    }
    let allSlots = SetRangeManager.getSlots(entity);
    allSlots.forEach((slots, type) => {
        for (const item of slots) {
            // 如果物品在对应槽位的黑名单中，跳过
            if (SetRangeManager.inBlacklist(item, type)) continue;
            // 1. 通过物品标签匹配套装
            const tags = map.itemTagMap[item.id];
            if (tags !== undefined) {
                for (const tag of tags) {
                    const tagSets = map.tagMap[tag];
                    if (tagSets !== undefined) {
                        for (const set of tagSets) {
                            countsMap[set.id] = (countsMap[set.id] || 0) + 1;
                            if (countsMap[set.id] === set.counts) {
                                activatedSets.push(set);
                            }
                        }
                    }
                }
            }
            // 2. 通过物品 ID 直接匹配套装
            const sets = map.itemMap[item.id];
            if (sets !== undefined) {
                for (const set of sets) {
                    countsMap[set.id] = (countsMap[set.id] || 0) + 1;
                    if (countsMap[set.id] === set.counts) {
                        activatedSets.push(set);
                    }
                }
            }
        }
    });
    return activatedSets;

}
/**
 * 
 * @param {Internal.Entity_} entity 
 * @param {String} eventType
 * @returns 
 */
function triggerSetEffects(entity,eventType,event) {
    if (entity != null && !entity.level.isClientSide()) {
        let setsToTrigger = []
        if (SetRangeManager != undefined) {
            setsToTrigger = getActivatedSets(entity)
            if (setsToTrigger.length === 0) return
            for (const set of setsToTrigger) {
                set.triggerFactory(eventType, event, set)
            }
        }
        
    }
    
}
/**
 * 
 * @param {Internal.LivingHurtEvent_} event 
 */
global.SetEffectsHurt = function(event) {
    if (event.entity.level.isClientSide()) return;
    triggerSetEffects(event.entity,'hurt',event)
}
/**
 * 
 * @param {Internal.LivingAttackEvent_} event 
 */
global.SetEffectsAttack = function(event) {
    if (event.entity.level.isClientSide()) return;
    triggerSetEffects(event.source.actual,'attack',event)
}
/**
 * 
 * @param {Internal.LivingEquipmentChangeEvent_} event 
 */
global.SetEffectsEquipt = function(event) {
    if (event.entity.level.isClientSide()) return;
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
        let toClientObject = {
            armor: allSlots.getOrDefault('armor', null) 
                ? allSlots.getOrDefault('armor', null).map(item => item.id) 
                : null,
            weapon: allSlots.getOrDefault('weapon', null) 
                ? allSlots.getOrDefault('weapon', null).map(item => item.id) 
                : null,
            curios: allSlots.getOrDefault('curios', null) 
                ? allSlots.getOrDefault('curios', null).map(item => item.id) 
                : null
        };
        let toClientBlacklistObject = SetRangeManager.blackList
        if (SetEffectsServerConfigInstance._canTrigger(event.entity)) {
            event.entity.sendData('SERangePacket',toClientObject)
            event.entity.sendData('SE_Blacklist',toClientBlacklistObject)
        }
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
        let toClientObject = {
            armor: allSlots.getOrDefault('armor', null) 
                ? allSlots.getOrDefault('armor', null).map(item => item.id) 
                : null,
            weapon: allSlots.getOrDefault('weapon', null) 
                ? allSlots.getOrDefault('weapon', null).map(item => item.id) 
                : null,
            curios: allSlots.getOrDefault('curios', null) 
                ? allSlots.getOrDefault('curios', null).map(item => item.id) 
                : null
        };
        
        let toClientBlacklistObject = SetRangeManager.blackList
        if (event.entity.isPlayer()) {
            event.entity.sendData('SERangePacket',toClientObject)
            event.entity.sendData('SE_Blacklist',toClientBlacklistObject)
        }
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
    if (Shared && (Shared.enableTick == false)) return
    if (!SetEffectsServerConfigInstance.enableTickLogic) return
    if (event.entity.level.isClientSide()) return;
    if (SetEffectsServerConfigInstance._canTrigger(event.entity)) {
        triggerSetEffects(event.entity,'tick',event)
    }
}
EntityEvents.spawned(event=>{
    if (SetEffectsServerConfigInstance._canTrigger(event.entity)) {
        triggerSetEffects(event.entity,'unequipt',event)
    }
})
EntityEvents.death(event=>{
    if (SetEffectsServerConfigInstance._canTrigger(event.entity)) {
        triggerSetEffects(event.entity,'unequipt',event)
    }
})
/**
 * 
 * @param {Internal.LivingHealEvent_} event 
 */
global.SetEffectsHeal = function(event) {
    if (SetEffectsServerConfigInstance._canTrigger(event.entity)) {
        triggerSetEffects(event.entity,'heal',event)
    }
}
/**
 * 
 * @param {Internal.LivingEvent$LivingJumpEvent_} event 
 */
global.SetEffectsJump = function(event) {
    if (SetEffectsServerConfigInstance._canTrigger(event.entity)) {
        triggerSetEffects(event.entity,'jump',event)
    }
}
/**
 * 
 * @param {Internal.LivingFallEvent_} event 
 */
global.SetEffectsFall = function(event) {
    if (SetEffectsServerConfigInstance._canTrigger(event.entity)) {
        triggerSetEffects(event.entity,'fall',event)
    }
}
/**
 * 
 * @param {Internal.LivingDeathEvent_} event 
 */
global.SetEffectsDeath = function(event) {
    if (!event.entity.isClientSide()) {
        triggerSetEffects(event.entity,'death',event)
    }
}