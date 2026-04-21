declare namespace SE {
    type RangeType = "armor&weapon" | "armor" | "weapon" | "curios" | "armor&curios" | "all"; 
    type SlotTypes_ = "armor" | "weapon" | "curios";
    declare class SetEffectsServerConfig_ {
        /**
         * @param {boolean} boolean
         */
        setEnableLivingToTriggerSetEffects(boolean: boolean): SetEffectsServerConfig_;
        /**
         * @param {boolean} boolean
         */
        setEnableTickLogic(boolean: boolean): SetEffectsServerConfig_;
        /**
         * @param {RangeType} range
         */
        setEnableEquipmentRange(range: RangeType): SetEffectsServerConfig_;

        addBlacklist(ingredient: Internal.Ingredient_, slotType: SlotTypes_): SetEffectsServerConfig_;
        addWhitelist(ingredient: Internal.Ingredient_, slotType: SlotTypes_): SetEffectsServerConfig_;
        removeBlacklist(ingredient: Internal.Ingredient_, slotType: SlotTypes_): SetEffectsServerConfig_;
        removeWhitelist(ingredient: Internal.Ingredient_, slotType: SlotTypes_): SetEffectsServerConfig_;
        
    }
}