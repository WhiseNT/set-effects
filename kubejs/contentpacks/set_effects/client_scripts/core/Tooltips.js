//priority:100



ItemEvents.tooltip(event=>{

    Client.player.sendData('SetEffectsPacket')
    SetTooltipEventsInstance.modifyListener()
    Client.scheduleInTicks(3,()=>{
        displayTooltip(event)
    })
})



function displayTooltip (event) {
    if (TooltipManager.tagMap == null || TooltipManager.itemsMap == null) Client.player.sendData('SetEffectsPacket')
    if ( TooltipManager.tagMap == null || TooltipManager.itemsMap == null) {
        return
    }
    let allArr = Object.entries(TooltipManager.tagMap).concat(Object.entries(TooltipManager.itemsMap))
    allArr.forEach(([ingredient,sets]) => {
        event.addAdvanced(ingredient,(item,advance,text)=>{
            if (event.shift) {
                if (!TooltipHelperInstance.getItemFlag(item.id)) return
                let len = 1
                sets.map(id=>id.asString).forEach(/**@param {Internal.StringTag_} setId*/setId=>{
                    /**@type {ShadowSetObject} */
                    let set = TooltipManager.setsMap[setId]
                    let count = 0
                    if (TooltipHelperInstance.getFlag('shift',setId)) {
                        if (set != undefined) text.add(1,Text.translatable("tooltip.set_effects.set",Text.translatable(createLangkeyFromSet(setId))).aqua()); else {

                        }
                        //遍历套装包含的所有物品
                        set.items.forEach(item=>{
                            len++
                            //默认为Unknown
                            let displayName = Text.of("Unknown")
                            let stringId = item.getAsString()
                            if (set != undefined) {
                                
                                if (stringId.startsWith("#")) {
                                    
                                    let tag = stringId.split("#")[1]
                                    let modid = tag.split(":")[0]
                                    let id = tag.split(":")[1].replace("/",".")
                                    let tagLangKeyString = "tag."+modid+"."+id
                                    displayName = Text.of("{").append(Text.translatable(tagLangKeyString).append(Text.of("}")))
                                } else {
                                    displayName = Item.of(item).displayName
                                }
                                
                                text.add(len,Text.of(" - ").darkGray().append(displayName.darkGray()))
                            }
                            
                            Object.entries(TooltipManager.playerArmor).forEach((value,index)=>{
                                for (const armor of value[1]) {
                                    if (TooltipManager.inBlacklist(armor,value[0])) return
                                    // 检查是否直接匹配或者通过标签匹配
                                    let isMatch = false;
                                    if (stringId.startsWith("#")) {
                                        // 如果item是标签，则检查armor是否属于该标签
                                        let tagItems = Ingredient.of(stringId).itemIds
                                        isMatch = tagItems.some(item => item === armor);
                                    } else {
                                        // 直接比较物品ID
                                        isMatch = item === armor;
                                    }
                                    
                                    if (isMatch) {
                                        text.remove(len);
                                        if (set != null) text.add(len,Text.of(" - ").append(displayName.green()).green());
                                        count +=1;
                                    }
                                }

                            })
                            

                        })
                        TooltipHelperInstance.triggerFactory("shift",event,item,advance,text,set,count,TooltipUtil)
                    }

                })
            } else {
                if (TooltipHelperInstance.getItemFlag(item.id) || TooltipHelperInstance.getFlag('shift')){
                    text.add(1,Text.translatable("tooltip.set_effects.shift").aqua())
                }
                sets.map(id=>id.asString).forEach(setId=>{
                    let set = TooltipManager.setsMap[setId]
                    if (set == undefined) {
                        //Client.player.sendData('SetsEffectC2S')
                    }
                    let count = 0
                    if (set == undefined ) return
                    set.items.forEach(item=>{
                        Object.entries(TooltipManager.playerArmor).forEach((value,index)=>{
                            for (const armor of value[1]) {
                                if (item == armor) {
                                    count +=1
                                }
                            }
                        })
                    })
                    if (TooltipHelperInstance.getFlag('unshift',setId)) {
                        TooltipHelperInstance.triggerFactory("unshift",event,item,advance,text,set,count,TooltipUtil)
                    }
                })
            }
        })
    });
}

function createLangkeyFromSet(setId) {
    let langkey = "set." + setId.split(":")[0] + "." + setId.split(":")[1]
    return langkey
}