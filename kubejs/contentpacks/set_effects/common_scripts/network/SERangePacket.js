//priority:99
//side:-startup

NetworkEvents.dataReceived('SERangePacket',event=>{
    if (ContentPacks.type().isClient()) {
        let data = event.data
        TooltipManager.putArmor(data)
    } else {
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
            console.log(toClientBlacklistObject)
            event.entity.sendData('SE_Blacklist',toClientBlacklistObject)
        }
    }
    
})