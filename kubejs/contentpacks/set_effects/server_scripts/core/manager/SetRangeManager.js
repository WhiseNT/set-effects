//priority:101




function SetRangeManager_ () {
    this.type = "armor"
    this.blackList = {}
}

SetRangeManager_.prototype.setRange = function(range) {
    this.type = range
}
SetRangeManager_.prototype.armor = function() {
    this.type = "armor"
}
SetRangeManager_.prototype.weapon = function() {
    this.type = "weapon"
}
SetRangeManager_.prototype.armorAndWeapon = function() {
    this.type = "armor&weapon"
}
SetRangeManager_.prototype.curios = function() {
    this.type = "curios"
}
SetRangeManager_.prototype.armorAndCurios = function() {
    this.type  = "armor&curios"
}
SetRangeManager_.prototype.all = function() {
    this.type = "all"
}
/**
 * 
 * @param {Internal.ItemStack_} item 
 * @param {SlotTypes_} slot 
 */
SetRangeManager_.prototype.addBlacklist = function(item,slot) {
    if (this.blackList[item] == undefined) this.blackList[item] = []
    this.blackList[item].push(slot)
}
/**
 * 
 * @param {Internal.ItemStack_} item 
 * @param {SlotTypes_} slot 
 */
SetRangeManager_.prototype.addWhitelist = function(item,slot) {
    if (this.blackList[item] == undefined) this.blackList[item] = []
    let slots = ["weapon","armor","curios"]
    slots.filter(e=>e != slot).forEach(t=>{
        this.blackList[item].push(t)
    })
}
/**
 * 
 * @param {Internal.ItemStack_} item 
 * @param {SlotTypes_} slot 
 */
SetRangeManager_.prototype.removeBlacklist = function(item,slot) {
    if (this.blackList[item] != undefined && this.blackList[item].find(slot) != undefined) {
        this.blackList[item] = this.blackList[item].filter(e=>e != slot)
    }
}

/**
 * 
 * @param {Internal.ItemStack_} item 
 * @param {SlotTypes_} slot 
 */
SetRangeManager_.prototype.removeWhitelist = function(item,slot) {
    if (this.blackList[item] != undefined) {
        let slots = ["weapon","armor","curios"]
        slots.filter(e=>e != slot).forEach(t=>{
            this.blackList[item] = this.blackList[item].filter(e=>e != t)
        })
    }
}

/**
 * 
 * @param {Internal.ItemStack_} item 
 * @param {SlotTypes_} slot 
 */
SetRangeManager_.prototype.inBlacklist = function(item,slot) {
    if (this.blackList[item.id] != undefined) {
        if (this.blackList[item.id].toString().includes(slot)) {
            return true
        } else return false
    } else return false
}
SetRangeManager_.prototype.getSlots = function(entity) {
    return enableSetRange(this.type,entity)
}
/**
 * 
 * @param {string} type 
 * @param {Internal.LivingEntity_} entity 
 */
function enableSetRange(type,entity) {
    let returnObejct = Utils.newMap()
    switch (type) {
        case "armor":
            returnObejct.put('armor', entity.getArmorSlots());
            //if (entity.isPlayer()) entity.sendData('SE_ArmorRnnge',{range:"armor&weapon"})
            break;
        case "weapon":
            returnObejct.put('weapon', entity.getHandSlots());
            //if (entity.isPlayer()) entity.sendData('SE_ArmorRnnge',{range:"armor&weapon"})
            break;
        case "armor&weapon":
            returnObejct.put('armor', entity.getArmorSlots());
            returnObejct.put('weapon', entity.getHandSlots());
            //if (entity.isPlayer()) entity.sendData('SE_ArmorRnnge',{range:"armor&weapon"})
            break;
        case "curios":
            if (CuriosFlag && entity.isLiving()) {
                if (CuriosHelper != null) {
                    if (CuriosHelper.check(entity)) {
                        returnObejct.put('curios', CuriosHelper.PlayerInv.getEquippedCurios(entity));
                    } else {
                        returnObejct.put('curios', []);
                    }
                }
            } else {
                returnObejct.put('curios', []);
            }
            break;
        case "armor&curios":
            if (entity.isLiving()) {
                returnObejct.put('armor', entity.getArmorSlots());
                if (CuriosHelper != null  && CuriosHelper.check(entity)) {
                    returnObejct.put('curios', CuriosHelper.PlayerInv.getEquippedCurios(entity));
                }
            } else {
                returnObejct.put('armor', entity.getArmorSlots());
            }
            break;
        case "all":
            if (entity.isLiving()) {
                returnObejct.put('armor', entity.getArmorSlots());
                returnObejct.put('weapon', entity.getHandSlots());
                
                if (CuriosHelper != null && CuriosHelper.check(entity)) {
                    returnObejct.put('curios', CuriosHelper.PlayerInv.getEquippedCurios(entity));
                }
            } else {
                returnObejct.put('armor', entity.getArmorSlots());
                returnObejct.put('weapon', entity.getHandSlots());
            }
            break;
        default:
            returnObejct.put('armor', entity.getArmorSlots());
            break;
    }
    return returnObejct;
}


const SetRangeManager = new SetRangeManager_()
const SlotTypes = new SlotTypes_()
