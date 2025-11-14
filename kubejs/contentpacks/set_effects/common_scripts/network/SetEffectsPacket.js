//priority:100
//side:-startup
NetworkEvents.dataReceived('SetEffectsPacket',event=>{
    if (ContentPacks.type().isClient()) {
        TooltipManager.setsMap = event.data.sets
        TooltipManager.itemsMap = event.data.items
        TooltipManager.tagMap = event.data.tags
        TooltipManager.itemTagMap = event.data.itemTags
    } else {
        event.player.sendData('SetEffectsPacket',{
        sets:SetEffectsDataUpdater.SetsMap,
        items:SetEffectsDataUpdater.ItemsMap,
        tags:SetEffectsDataUpdater.TagsMap,
        itemTags:SetEffectsDataUpdater.ItemTagsMap
    })
    }
    
})