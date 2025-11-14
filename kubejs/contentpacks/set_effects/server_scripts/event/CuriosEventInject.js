//priority:99
//requires: curios
/**
 * 
 * @param {Internal.CurioChangeEvent_} event 
 */
global.SetEffectsCuriosEquipt = function(event) {
    if (event.entity.level.isClientSide()) return
    equiptTrigger(event)
    unequiptTrigger(event)
}
