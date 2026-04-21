
NetworkEvents.dataReceived('SE_Blacklist',event=>{
    let data = event.data
    TooltipManager.blackList = data
})

if (Client.player) {
    Client.player.sendData('SetEffectsPacket')
    Client.player.sendData('SERangePacket')
}

