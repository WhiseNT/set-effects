
/**
 * @typedef {SetTooltipEventCallback}
 * @property {Internal.ItemTooltipEventJS} event
 * @property {Internal.ItemStack_} item
 * @property {Boolean} advanced
 * @property {Internal.List<any>} text
 * @property {String} set
 * @property {Number} count
 */
function SetTooltipEvents_() {
    this.hooks = {
        modify:[]
    }
}

SetTooltipEvents_.prototype.shift = function(set,event) {
    TooltipHelperInstance.injectShiftTooltipFunc(set,event)
}
SetTooltipEvents_.prototype.unshift = function(set,event) {
    TooltipHelperInstance.injectUnshiftTooltipFunc(set,event)
}
SetTooltipEvents_.prototype.always = function(set,event) {
    TooltipHelperInstance.injectAlwaysTooltipFunc(set,event)
}
SetTooltipEvents_.prototype.modify = function(event) {
    this.hooks.modify.push(event)
}

SetTooltipEvents_.prototype.modifyListener = function() {
    this.hooks.modify.forEach(func=>{
        func({
            hideSetTooltip: function(setId,type,boolean) {
                return TooltipHelperInstance.setFlag(setId,type,!boolean)
            },
            hideItemTooltip: function(itemId,boolean) {
                if (itemId.startsWith('#')) {
                    return TooltipHelperInstance.setTagFlag(itemId,!boolean)
                } else {
                    return TooltipHelperInstance.setItemFlag(itemId,!boolean)
                }
                
            },
            hideTagTooltip: function(tagId,boolean) {
                return TooltipHelperInstance.setTagFlag(tagId,!boolean)
            }
        })
    })
}
const SetTooltipEventsInstance = new SetTooltipEvents_()

ContentPacks.putShared('com.whisent.seteffects.client.SetTooltipEvents',SetTooltipEventsInstance)