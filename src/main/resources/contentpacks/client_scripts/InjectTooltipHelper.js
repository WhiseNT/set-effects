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
SetsTooltipInjectHelper.prototype.setFlag = function (set,boolean) {
    this.flags[set] = boolean
}
SetsTooltipInjectHelper.prototype.getFlag = function (set) {
    if (this.flags[set.id] == undefined) return true
    return this.flags[set.id]
}
SetsTooltipInjectHelper.prototype.getFlag = function (set) {
    if (this.flags[set.id] == undefined) return true
    return this.flags[set.id]
}

SetsTooltipInjectHelper.prototype.triggerFactory = function(type,event,item,advance,text,set,count) {
    if (this.hooks[type] != undefined && this.hooks[type][set.id] != undefined) {
        this.hooks[type][set.id].forEach(func=>{
            func(event,item,advance,text,set,count)
        })
    }
    
}
const TooltipHelperInstance = new SetsTooltipInjectHelper()
ContentPacks.putShared('com.whisent.seteffects.tooltip',TooltipHelperInstance)