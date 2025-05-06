//priority:100
function DataUpdater() {
    this.SetsMap = Utils.newMap()
    this.ItemsMap = Utils.newMap()
}
DataUpdater.prototype.update = function(map) {
    map.itemMap.forEach((itemId,sets)=>{
        sets.forEach(set=>{
            let obj = set.shadow
            this.SetsMap.putIfAbsent(set.id,obj)
            this.ItemsMap.putIfAbsent(itemId,[])
            const a = []
            if (this.ItemsMap.get(itemId).find(e=>e == set.id) == undefined) {
                this.ItemsMap.get(itemId).push(set.id)
            }
        })
    })
}

const SetEffectsDataUpdater = new DataUpdater()
Shared.dataUpdater = SetEffectsDataUpdater
//延时同步
PlayerEvents.loggedIn(event=>{
    event.server.scheduleInTicks(2,()=>{
        event.player.sendData('SetsEffectClient',{sets:Shared.setsMap,items:SetEffectsDataUpdater.ItemsMap})
    })
})
NetworkEvents.dataReceived('SetsEffectServer',event=>{

    event.player.sendData('SetsEffectClient',{sets:SetEffectsDataUpdater.SetsMap,items:SetEffectsDataUpdater.ItemsMap})
})





