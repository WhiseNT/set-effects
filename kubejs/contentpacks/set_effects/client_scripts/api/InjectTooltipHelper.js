//priority:100
function SetsTooltipInjectHelper() {
    this.hooks = {}
    this.flags = {}
}
SetsTooltipInjectHelper.prototype.injectShiftTooltipFunc = function(set,callback) {
    if (!this.hooks["shift"]) {
        this.hooks["shift"] = {}
    }
    if (!this.hooks["shift"][set]) {
        this.hooks["shift"][set] = []
    }
    this.hooks["shift"][set].push(callback)
}
SetsTooltipInjectHelper.prototype.injectUnshiftTooltipFunc = function(set,callback) {
    if (!this.hooks["unshift"]) {
        this.hooks["unshift"] = {}
    }
    if (!this.hooks["unshift"][set]) {
        this.hooks["unshift"][set] = []
    }
    this.hooks["unshift"][set].push(callback)
}
SetsTooltipInjectHelper.prototype.injectAlwaysTooltipFunc = function(set,callback) {
    this.injectShiftTooltipFunc(set,callback)
    this.injectUnshiftTooltipFunc(set,callback)
}
SetsTooltipInjectHelper.prototype.setFlag = function (set,type,boolean) {
    if (this.flags[type] == undefined) this.flags[type] = {}
    this.flags[type][set] = boolean
}
SetsTooltipInjectHelper.prototype.setItemFlag = function (item,boolean) {
    if (this.flags['item'] == undefined) this.flags['item'] = {}
    this.flags['item'][item] = boolean
}
SetsTooltipInjectHelper.prototype.getFlag = function (type,set) {
    if (set == undefined) return false
    if (this.flags[type] == undefined ||this.flags[type][set] == undefined) return true
    return this.flags[type][set]
}
SetsTooltipInjectHelper.prototype.getItemFlag = function (item) {
    if (item == undefined) return
    if (this.flags['item'] == undefined || this.flags['item'][item] == undefined) return true
    return this.flags['item'][item]
}
SetsTooltipInjectHelper.prototype.setTagFlag = function (tag,boolean) {
    if (tag == undefined) return
    Ingredient.of(tag).getItemIds().forEach(item=>{
        this.setItemFlag(item,boolean)
    })
}
/**
 * 
 * @param {String} type 
 * @param {Internal.ItemTooltipEventJS_} event 
 * @param {Internal.ItemStack_} item 
 * @param {Boolean} advance 
 * @param {Internal.List<any>} text 
 * @param {String} set 
 * @param {Number} count 
 * @param {Object} util
 */
SetsTooltipInjectHelper.prototype.triggerFactory = function(type,event,item,advance,text,set,count,util) {
    let collection = {
        "event":event,
        "item":item,
        "advance":advance,
        "text":text,
        "set":set,
        "count":count,
        "util":util
    }
    if (this.hooks[type] != undefined && this.hooks[type][set.id] != undefined) {
        this.hooks[type][set.id].forEach(func=>{
            func(collection)
        })
    }

}
const TooltipHelperInstance = new SetsTooltipInjectHelper()
ContentPacks.putShared('com.whisent.seteffects.tooltip',TooltipHelperInstance)
