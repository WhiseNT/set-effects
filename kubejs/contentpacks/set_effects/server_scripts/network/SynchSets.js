//priority:99
function DataUpdater() {
    this.SetsMap = Utils.newMap()
    this.ItemsMap = Utils.newMap()
    this.TagsMap = Utils.newMap()
    this.ItemTagsMap = Utils.newMap()
}
/**
 * 
 * @param {SetsMap} map 
 */
DataUpdater.prototype.update = function(map) {
    map.sets.forEach(/** @param {EffectiveSet} set*/(setId,set)=>{
        let obj = set.shadow
        this.SetsMap.putIfAbsent(set.id,obj)
        if (set.items == undefined) return
        set.items.forEach(item=>{
            //是tag
            if (item.startsWith("#")) {
                this.TagsMap.putIfAbsent(item,[])
                if (this.TagsMap.get(item).find(e=>e == set.id) == undefined) {
                    this.TagsMap.get(item).push(set.id)
                }
                
                this.ItemTagsMap.putIfAbsent(item,[])
                if (this.ItemTagsMap.get(item).find(e=>e == set.id) == undefined) {
                    this.ItemTagsMap.get(item).push(set.id)
                }
            } else {
                this.ItemsMap.putIfAbsent(item,[])
                if (this.ItemsMap.get(item).find(e=>e == set.id) == undefined) {
                    this.ItemsMap.get(item).push(set.id)
                }
            }
        })
    })
    /*
    map.itemMap.forEach((itemId,sets)=>{
        sets.forEach(set=>{
            let obj = set.shadow
            this.SetsMap.putIfAbsent(set.id,obj)
            this.ItemsMap.putIfAbsent(itemId,[])
            this.TagsMap.putIfAbsent(itemId,[])
            this.ItemTagsMap.putIfAbsent(itemId,[])
            const a = []
            if (this.ItemsMap.get(itemId).find(e=>e == set.id) == undefined) {
                this.ItemsMap.get(itemId).push(set.id)
            }
        })
    })
        */
}

const SetEffectsDataUpdater = new DataUpdater()
Shared.dataUpdater = SetEffectsDataUpdater
//延时同步
PlayerEvents.loggedIn(event=>{
    event.server.scheduleInTicks(2,()=>{
        event.player.sendData('SetEffectsPacket',{
            sets:SetEffectsDataUpdater.SetsMap,
            items:SetEffectsDataUpdater.ItemsMap,
            tags:SetEffectsDataUpdater.TagsMap,
            itemTags:SetEffectsDataUpdater.ItemTagsMap
        })
    })
})








