//priority:101
let CuriosFlag = Platform.isLoaded('curios')
let CuriosHelper = null
if (!CuriosFlag) {
    CuriosHelper = {
        /**
         * 玩家饰品栏相关功能组
         */
        PlayerInv:{
            /**
             * 返回玩家的饰品Inventory
             * @param {Internal.Player_} player 玩家
             */
            inv:function(player) {
                return $CuriosAPI.getCuriosInventory(player).resolve().get()
            },
            /**
             * 返回玩家所有已装备的饰品
             * @param {Internal.Player_} player 玩家
             */
            getEquippedCurios:function(player) {
                /**@type {Internal.CuriosApi_} */
                return this.inv(player).getEquippedCurios().allItems
            }
        }
    }
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
            break;
        case "weapon":
            returnObejct.put('weapon', entity.getHandSlots());
            break;
        case "armor&weapon":
            returnObejct.put('armor', entity.getArmorSlots());
            returnObejct.put('weapon', entity.getHandSlots());
            break;
        case "curios":
            if (CuriosFlag && entity.isPlayer()) {
                if (CuriosHelper != null) {
                    returnObejct.put('curios', CuriosHelper.PlayerInv.getEquippedCurios(entity));
                }
            } else {
                returnObejct.put('curios', []);
            }
            break;
        case "armor&curios":
            if (entity.isPlayer()) {
                returnObejct.put('armor', entity.getArmorSlots());
                if (CuriosHelper != null) {
                    returnObejct.put('curios', CuriosHelper.PlayerInv.getEquippedCurios(entity));
                }
            } else {
                returnObejct.put('armor', entity.getArmorSlots());
            }
            break;
        case "all":
            if (entity.isPlayer()) {
                returnObejct.put('armor', entity.getArmorSlots());
                returnObejct.put('weapon', entity.getHandSlots());
                if (CuriosHelper != null) {
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
function SlotTypes_ () {
    this.ARMOR = "armor"
    this.WEAPON = "weapon"
    this.CURIOS = "curios"
}
function SetRangeManager_ () {
    this.type = "armor"
    this.blackList = {}
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
const SetRangeManager = new SetRangeManager_()
const SlotTypes = new SlotTypes_()
