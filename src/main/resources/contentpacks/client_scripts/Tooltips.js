//priority:100
function SetsTooltipsManager() {
    this.setsMap = null;
    this.itemsMap = null;
    this.playerArmor = {};
    this.blackList = {};
}

SetsTooltipsManager.prototype.checkMaps = function() {
    return this.setsMap != null && this.itemsMap != null
}
SetsTooltipsManager.prototype.putArmor = function(slots) {
    this.playerArmor = slots
}
SetsTooltipsManager.prototype.inBlacklist = function(item,slot) {
    if (this.blackList[item] != undefined) {
        if (this.blackList[item].toString().includes(slot)) {
            return true
        } else return false
    } else return false
}
const TooltipManager = new SetsTooltipsManager()

NetworkEvents.dataReceived('SetsEffectClient',event=>{
    TooltipManager.setsMap = event.data.sets

    TooltipManager.itemsMap = event.data.items
})
ItemEvents.tooltip(event=>{
    Client.player.sendData('SetsEffectServer')
    Client.scheduleInTicks(3,()=>{
        displayTooltip(event)
    })
})

NetworkEvents.dataReceived('SE_Range',event=>{
    let data = event.data
    TooltipManager.putArmor(data)
})
NetworkEvents.dataReceived('SE_Blacklist',event=>{
    let data = event.data
    TooltipManager.blackList = data
})
ContentPacks.putShared('com.whisent.seteffects.client.Tooltip',TooltipManager)
function displayTooltip (event) {
    if (TooltipManager.itemsMap == null) Client.player.sendData('SetsEffectServer')
    Object.entries(TooltipManager.itemsMap).forEach(([item,sets]) => {
        event.addAdvanced(item,(item,advance,text)=>{
            if (event.shift) {
                if (!TooltipHelperInstance.getItemFlag(item.id)) return
                let len = 1
                sets.map(id=>id.asString).forEach(/**@param {Internal.StringTag_} setId*/setId=>{
                    /**@type {ShadowSetObject} */
                    let set = TooltipManager.setsMap[setId]
                    let count = 0
                    if (TooltipHelperInstance.getFlag('shift',setId)) {
                        if (set != undefined) text.add(1,Text.translatable("tooltip.set_effects.set",set.name).aqua()); else {

                        }
                        set.items.forEach(item=>{
                            len++
                            if (set != undefined) text.add(len,Text.of(" - ").darkGray().append(Item.of(item).displayName.darkGray()))
                            Object.entries(TooltipManager.playerArmor).forEach((value,index)=>{
                                for (const armor of value[1]) {
                                    if (TooltipManager.inBlacklist(item,value[0])) return
                                    if (item == armor) {
                                        text.remove(len)
                                        if (set != null) text.add(len,Text.of(" - ").append(Item.of(item).displayName.green()).green())
                                        count +=1
                                    }
                                }

                            })

                        })
                        TooltipHelperInstance.triggerFactory("shift",event,item,advance,text,set,count)
                    }

                })
            } else {
                if (TooltipHelperInstance.getItemFlag(item.id) || TooltipHelperInstance.getFlag('shift')){
                    text.add(1,Text.translatable("tooltip.set_effects.shift").aqua())
                }
                sets.map(id=>id.asString).forEach(setId=>{
                    let set = TooltipManager.setsMap[setId]
                    if (set == undefined) {
                        //Client.player.sendData('SetsEffectServer')
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
                        TooltipHelperInstance.triggerFactory("unshift",event,item,advance,text,set,count)
                    }
                })
            }
        })
    });
}