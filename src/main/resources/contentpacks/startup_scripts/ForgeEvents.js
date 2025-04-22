
ForgeEvents.onEvent('net.minecraftforge.event.entity.living.LivingHurtEvent',event=>{
    global.SetEffectsHurt(event)
})
ForgeEvents.onEvent('net.minecraftforge.event.entity.living.LivingAttackEvent',event=>{
    global.SetEffectsAttack(event)
})

ForgeEvents.onEvent('net.minecraftforge.event.entity.living.LivingEquipmentChangeEvent',
    /**@param {Internal.LivingEquipmentChangeEvent_} event*/
    event=>{
    global.SetEffectsEquipt(event)
})
ForgeEvents.onEvent('net.minecraftforge.event.entity.living.LivingEvent$LivingTickEvent',event=>{
    global.SetEffectsTick(event)
})
ForgeEvents.onEvent('net.minecraftforge.event.entity.living.LivingHealEvent',event=>{
    global.SetEffectsHeal(event)
})
ForgeEvents.onEvent('net.minecraftforge.event.entity.living.LivingEvent$LivingJumpEvent',event=>{
    global.SetEffectsJump(event)
})
ForgeEvents.onEvent('net.minecraftforge.event.entity.living.LivingFallEvent',event=>{
    global.SetEffectsFall(event)
})
ForgeEvents.onEvent('net.minecraftforge.event.entity.living.LivingDeathEvent',event=>{
    global.SetEffectsDeath(event)
})
