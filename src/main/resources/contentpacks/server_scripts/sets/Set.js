//priority:100

const $UUID = Java.loadClass('java.util.UUID')
const $AttributeModifier = Java.loadClass('net.minecraft.world.entity.ai.attributes.AttributeModifier')

function EffectiveSet(items,id) {
    this.id = id
    this.name = 'Default Name';
    this.items = items
    this.counts = items.length
    this.potionEffects = []
    this.attributes = []
    this.hooks = {
        effect:[],
        hurt:[],
        heal:[],
        attack:[],
        tick:[],
        fall:[],
        jump:[],
        spawn:[],
        death:[],
        equipt:[],
        unequipt:[],
        active:[]
    }
    /**@type {SetsMap} */
    const SetsMap = ContentPacks.getShared('server','com.whisent.seteffects').setsMap
    SetsMap.add(this.id,this)
    this.shadow = new ShadowSetObject(this.id,'Default Name',items)
    items.forEach(item=>{
        SetsMap.addItem(item,this)
    })
    
}
EffectiveSet.prototype.getShadow = function() {
    return this.shadow
}
/**
 * 
 * @param {String} name 
 */
EffectiveSet.prototype.setName = function(name) {
    this.name = name
    this.shadow.name = name
}
/**
 * 
 * @param {Internal.MobEffect_} mobEffect 
 * @param {Number} amplifier 
 * @param {Boolean} ambient 
 * @param {Boolean} showParticles 
 */
EffectiveSet.prototype.addPotionEffect = function(mobEffect,amplifier,ambient,showParticles) {
    let obj = {
        mobEffect:mobEffect,
        amplifier:amplifier,
        ambient:ambient,
        showParticles:showParticles
    }
    this.potionEffects.push(obj)
}
/**
 * 
 * @param {Internal.Attribute_} attribute 
 * @param {UUID_} uuid
 * @param {Number} d 
 * @param {Internal.AttributeModifier$Operation_} operation 
 */
EffectiveSet.prototype.addAttribute = function(attribute,uuid,d,operation) {
    let modifier = new $AttributeModifier(uuid,this.id,d,operation)
    let obj = {
        attribute:attribute,
        modifier:modifier,
        uuid:uuid
    }
    this.attributes.push(obj)
}
/**
 * 
 * @param {String} eventType 
 * @param {*} event 
 * @param {EffectiveSet} set 
 */
EffectiveSet.prototype.triggerFactory = function(eventType,event,set) {
    const hook = this.hooks[eventType]
    if (hook && hook.length > 0) {
        hook.forEach(func => {
            func(event,set)
        });
    }
}
EffectiveSet.prototype.injectHurtFunc = function(callback) {
    this.hooks.hurt.push(callback)
}
EffectiveSet.prototype.injectAttackFunc = function(callback) {
    this.hooks.attack.push(callback)
}
EffectiveSet.prototype.injectEquiptFunc = function(callback) {
    this.hooks.equipt.push(callback)
}
EffectiveSet.prototype.injectUnequiptFunc = function(callback) {
    this.hooks.unequipt.push(callback)
}
EffectiveSet.prototype.injectTickFunc = function(callback) {
    this.hooks.tick.push(callback)
}
EffectiveSet.prototype.injectHealFunc = function(callback) {
    this.hooks.heal.push(callback)
}
EffectiveSet.prototype.injectJumpFunc = function(callback) {
    this.hooks.jump.push(callback)
}
EffectiveSet.prototype.injectFallFunc = function(callback) {
    this.hooks.fall.push(callback)
}
EffectiveSet.prototype.injectDeathFunc = function(callback) {
    this.hooks.death.push(callback)
}
/**
 * 用于存储所有套装信息的表,会根据该表内注册的信息来获取对应的套装
 */
function SetsMap() {
    this.sets = Utils.newMap()
    this.itemMap = Utils.newMap()
}
SetsMap.prototype.add = function(id,set) {
    this.sets.put(id,set)
}
SetsMap.prototype.addItem = function(item,set) {
    if (this.itemMap[item] == undefined) {
        this.itemMap.put(item,[])
    }
    this.itemMap[item].push(set)
}


function SharedObject() {
    this.EffectiveSet = EffectiveSet,
    this.setsMap = new SetsMap()
    this.dataUpdater;
    this.setRangeManager = SetRangeManager;
    this.setEvents = SetEvents;
}
const Shared = new SharedObject()
ContentPacks.putShared('com.whisent.seteffects',Shared)
const map = Shared.setsMap
/**
 * 创建临时的套装实例,用于套装表的key
 * @param {Array<Internal.ItemStack_>} items 
 */
function ShadowSetObject(id,name,items) {
    this.id = id
    this.name = name
    this.items = items
}

