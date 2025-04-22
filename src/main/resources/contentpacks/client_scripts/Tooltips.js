//priority:100
function SetsTooltipsManager() {
    this.setsMap = null;
    this.itemsMap = null;
    this.playerArmor = [];
}

SetsTooltipsManager.prototype.checkMaps = function() {
    return this.setsMap != null && this.itemsMap != null
}
SetsTooltipsManager.prototype.putArmor = function(slots) {
    this.playerArmor = slots
}
const TooltipManager = new SetsTooltipsManager()
NetworkEvents.dataReceived('SetsEffectClient',event=>{
    TooltipManager.setsMap = event.data.sets
    TooltipManager.itemsMap = event.data.items
})
ItemEvents.tooltip(event=>{
    if (TooltipManager.itemsMap == null) {
        Client.player.sendData('SetsEffectServer')
    }
    if (TooltipManager.itemsMap == null) {
        Client.scheduleInTicks(2,()=>{
            displayTooltip(event)
        })
    } else {
        displayTooltip(event)
    }
})
ClientEvents.tick(event=>{
    let slots = event.player.getArmorSlots()
    if (slots != TooltipManager.playerArmor) {
        TooltipManager.putArmor(slots)
    }
})
ContentPacks.putShared('com.whisent.seteffects.client.Tooltip',TooltipManager)
function displayTooltip (event) {
    if (!TooltipManager.itemsMap) return
    Object.entries(TooltipManager.itemsMap).forEach(([item,sets]) => {
        event.addAdvanced(item,(item,advance,text)=>{
            if (event.shift) {
                let len = 1
                sets.map(id=>id.asString).forEach(/**@param {Internal.StringTag_} setId*/setId=>{
                        /**@type {ShadowSetObject} */
                        let set = JSON.parse(TooltipManager.setsMap[setId])
                        let count = 0
                        if (TooltipHelperInstance.getFlag(set)) {
                        text.add(1,Text.translatable("tooltip.set_effects.set",set.name).aqua())
                        set.items.forEach(item=>{
                            len++
                            text.add(len,Text.of(" - ").darkGray().append(Item.of(item).displayName.darkGray()))
                            for (const armor of TooltipManager.playerArmor) {
                                if (item == armor) {
                                    text.remove(len)
                                    text.add(len,Text.of(" - ").append(Item.of(item).displayName.green()).green())
                                    count +=1
                                }
                            }
                        })
                        TooltipHelperInstance.triggerFactory("shift",event,item,advance,text,set,count)
                        }
                    
                })
            } else {
                text.add(1,Text.translatable("tooltip.set_effects.shift").aqua())
                sets.map(id=>id.asString).forEach(/**@param {Internal.StringTag_} setId*/setId=>{
                    let set = JSON.parse(TooltipManager.setsMap[setId])
                    let count = 0
                    set.items.forEach(item=>{
                        for (const armor of TooltipManager.playerArmor) {
                            if (item == armor) {
                                count +=1
                            }
                        }
                    })
                    TooltipHelperInstance.triggerFactory("unshift",event,item,advance,text,set,count)
                })
            }
        })
    });
}