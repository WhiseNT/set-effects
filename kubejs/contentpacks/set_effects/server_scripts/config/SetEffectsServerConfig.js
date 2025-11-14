function SetEffectsServerConfig_() {
    this.enableLivingToTriggerSetEffects = true;
    this.enableTickLogic = true;
    this.setRangeManager = SetRangeManager;
    //this.whitelistEntityCanTriggerSetEffects = [];
    //this.blacklistEntityCanTriggerSetEffects = [];
    //this.customEntityMatchCallback = function(entity) { return true; };
    
}

SetEffectsServerConfig_.prototype.setEnableEquipmentRange = function(range) {
    this.setRangeManager.setRange(range);
    return this
}
SetEffectsServerConfig_.prototype.setEnableLivingToTriggerSetEffects = function(boolean) {
    this.enableLivingToTriggerSetEffects = boolean;
    return this
}
SetEffectsServerConfig_.prototype.setEnableTickLogic = function(boolean) {
    this.enableTickLogic = boolean;
    return this
}
SetEffectsServerConfig_.prototype.addBlacklist = function(ingredient,slotType) {
    Ingredient.of(ingredient).getItemIds().forEach(item=>{
        this.setRangeManager.addBlacklist(item,slotType)
    })
    return this
}
SetEffectsServerConfig_.prototype.removeBlacklist = function(ingredient,slotType) {
    Ingredient.of(ingredient).getItemIds().forEach(item=>{
        this.setRangeManager.removeBlacklist(item,slotType)
    })
    return this
}
SetEffectsServerConfig_.prototype.addWhitelist = function(ingredient,slotType) {
    Ingredient.of(ingredient).getItemIds().forEach(item=>{
        this.setRangeManager.addWhitelist(item,slotType)
    })
    return this
}
SetEffectsServerConfig_.prototype.removeWhitelist = function(ingredient,slotType) {
    Ingredient.of(ingredient).getItemIds().forEach(item=>{
        this.setRangeManager.removeWhitelist(item,slotType)
    })
    return this
}
/**
 * 
 * @param {Internal.Entity_} entity 
 * @returns 
 */
SetEffectsServerConfig_.prototype._canTrigger = function(entity) {
    if (entity.level.isClientSide()) return false;
    if (entity.isLiving() && this.enableLivingToTriggerSetEffects) {
        return true;
    } else if (entity.isPlayer()) {
        return true;
    } 
    return false
}

const SetEffectsServerConfigInstance = new SetEffectsServerConfig_()