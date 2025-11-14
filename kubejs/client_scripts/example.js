/**@type {SetsTooltipInjectHelper_} */
const TooltipHelper = ContentPacks.getShared('client','com.whisent.seteffects.tooltip')
//hide the "leather_basic" set 's tooltips

//TooltipHelper.setItemFlag("minecraft:leather_boots",false)
/**@type {SE.SetTooltipEventJS} */

const SetTooltipEvents = ContentPacks.getShared('com.whisent.seteffects.client.SetTooltipEvents')
SetTooltipEvents.modify(event=>{
    event.hideItemTooltip('#minecraft:swords','shift',true)
    event.hideSetTooltip('example:heavy_iron_set','shift',true)
})
SetTooltipEvents.shift('example:leather_set',(event)=>{
    const {item,text,count,advance,set,util} = event
    if (event.count == 4) {
        text.add(2,Text.translatable("tooltip.example.four_pieces").gray())
        util.createPotionEffectTooltip(text,3,'speed',0,null,null,false)
        text.add(4,"")
    }
})
SetTooltipEvents.shift("example:iron_set",event=>{
    const {item,text,count,advance,set,util} = event
    if (event.count >= 2) {
        text.add(2,Text.translatable("tooltip.example.two_pieces").gray())
        util.createAttributeTooltip(text,3,'minecraft:generic.armor',2.0,null,null,false)
    }
    if (event.count == 4) {
        text.add(4,Text.translatable("tooltip.example.four_pieces").gray())
        util.createAttributeTooltip(text,5,'minecraft:generic.armor',4.0,null,Text.of("(额外)"),false)
        util.createAttributeTooltip(text,6,"minecraft:generic.movement_speed",-0.07,null,null,true)
        text.add(7,"")
    }
})
SetTooltipEvents.shift('example:gold_set',(event)=>{
    const {item,text,count,advance,set,util} = event
    if (event.count == 4) {
        text.add(2,Text.translatable("tooltip.example.four_pieces").gray())
        util.createPotionEffectTooltip(text,3,'haste',0,null,null,false)
        util.createPotionEffectTooltip(text,4,'speed',0,null,null,false)
        text.add(5,"")
    }
})
SetTooltipEvents.shift('example:diamond_set',(event)=>{
    const {item,text,count,advance,set,util} = event
    if (event.count == 4) {
        text.add(2,Text.translatable("tooltip.example.four_pieces").gray())
        util.createAttributeTooltip(text,3,'minecraft:generic.armor',2.0,null,null)
        util.createAttributeTooltip(text,4,"minecraft:generic.armor_toughness",2.0,null,null)
        text.add(5,"")
    }
})
SetTooltipEvents.shift('example:netherite_set',(event)=>{ 
    const {item,text,count,advance,set,util} = event
    if (event.count == 4) {
        text.add(2,Text.translatable("tooltip.example.four_pieces").gray())
        util.createAttributeTooltip(text,3,'minecraft:generic.knockback_resistance',1.0,null,null)
        util.createPotionEffectTooltip(text,4,'fire_resistance',0,null,null)
        util.createPotionEffectTooltip(text,5,'resistance',0,null,null)
        text.add(6,Text.of("减轻摔落伤害").darkAqua())
        text.add(7,"")
    }
})

SetTooltipEvents.shift('example:shield_set',(event)=>{
    const {item,text,count,advance,set,util} = event
    if (event.count == 2) {
        text.add(2,Text.translatable("tooltip.example.equipment_set").gray())
        util.createAttributeTooltip(text,3,'minecraft:generic.knockback_resistance',1.0,Color.AQUA,null)
        text.add(4,"")
    }
})