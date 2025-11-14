declare namespace SE {
    declare class SetApi {
        /**
         * 
         * @param {Internal.LivingEntity_} entity 
         * @returns {EffectiveSet[]}
         */
        getSets(entity: Internal.LivingEntity_): EffectiveSet[];
        /**
         * 
         * @param {Internal.LivingEntity_} entity 
         * @param {String} setId
         * @returns 
         */
        isActive(entity: Internal.LivingEntity_, setId: string): boolean;

    }
    

}