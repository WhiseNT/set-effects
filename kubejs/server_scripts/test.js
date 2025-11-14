//首先需要从Shared中获取SetEffects对象

const SEShared = ContentPacks.getShared('server','com.whisent.seteffects.SetEffects')

//在获取SetEffects对象后，可以获取SetEvents对象。

const SetEvents = SEShared.setEvents

const SetApi = SEShared.setApi
//注册事件
SetEvents.registry(event=>{
    event.create(['leather_helmet','leather_chestplate','leather_leggings','leather_boots'],'example:leather_set')
            .addPotionEffect('speed',0,false,false)
    event.create(["iron_helmet",'iron_chestplate','iron_leggings','iron_boots'],'example:iron_set')
            .addAttribute("minecraft:generic.armor",KLUtils.genUUID('iron_set'),2.0,'addition')
            .setCounts(2)
    event.create(["iron_helmet",'iron_chestplate','iron_leggings','iron_boots'],'example:heavy_iron_set')
            .addAttribute("minecraft:generic.armor",KLUtils.genUUID('heavy_iron_set'),4.0,'addition')
            .addAttribute("minecraft:generic.movement_speed",KLUtils.genUUID('heavy_iron_set'),-0.07,'multiply_total')

    
    event.create(['golden_helmet',"golden_chestplate","golden_leggings","golden_boots"],'example:gold_set')
            .addPotionEffect('haste',0,false,false)
            .addPotionEffect('speed',0,false,false)

    event.create(['diamond_helmet',"diamond_chestplate","diamond_leggings","diamond_boots"],'example:diamond_set')
            .addAttribute("minecraft:generic.armor",KLUtils.genUUID('diamond_set'),2.0,'addition')
            .addAttribute("minecraft:generic.armor_toughness",KLUtils.genUUID('diamond_set'),2.0,'addition')

    event.create(['netherite_helmet',"netherite_chestplate","netherite_leggings","netherite_boots"],'example:netherite_set')
            .addPotionEffect('fire_resistance',0,false,false)
            .addPotionEffect('resistance',0,false,false)
            .addAttribute("minecraft:generic.armor_toughness",KLUtils.genUUID('netherite_set'),4.0,'addition')
            .injectFallFunc((event,set)=>{
                event.setDistance(event.getDistance() * 0.5)
            })
    event.create(["shield",'#minecraft:swords'],'example:shield_set')
            .addAttribute("minecraft:generic.knockback_resistance",KLUtils.genUUID('shield'),1.0,'addition')
            .addAttribute("minecraft:generic.armor",KLUtils.genUUID('shield'),1.0,'addition')
})
//可以在注册后用该事件修改套装的属性
SetEvents.modification(event=>{
    event.getSet('leather_basic')
})

//配置事件便于开发者通过脚本动态地进行配置
SetEvents.config(event=>{
    const {config} = event
    config.setEnableEquipmentRange('all')
    config.setEnableLivingToTriggerSetEffects(false)
    config.setEnableTickLogic(false)
    config.addWhitelist('#forge:armors','armor')
    
    
})







