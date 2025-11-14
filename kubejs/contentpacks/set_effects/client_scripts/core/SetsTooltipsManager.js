//priority:101

function SetsTooltipsManager() {
    this.setsMap = null;
    this.itemsMap = null;
    this.tagMap = null;
    this.itemTagMap = null;
    this.playerArmor = {};
    this.blackList = {};
}

SetsTooltipsManager.prototype.checkMaps = function() {
    return this.setsMap != null && this.itemsMap != null && this.tagMap!= null && this.itemTagMap!= null
}
SetsTooltipsManager.prototype.putArmor = function(slots) {
    this.playerArmor = slots
}
SetsTooltipsManager.prototype.inBlacklist = function(item,slot) {
    let idFix = item.getAsString()
    if (this.blackList[idFix] == undefined) return false
    else {
        return this.blackList[idFix].findIndex(v=>v == slot) != -1
    }
}
const TooltipManager = new SetsTooltipsManager()

ContentPacks.putShared('com.whisent.seteffects.client.Tooltip',TooltipManager)