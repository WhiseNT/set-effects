//priority:100
const SetApi = {
    /**
     * 
     * @param {Internal.LivingEntity_} entity 
     * @returns {EffectiveSet[]}
     */
    getSets: function(entity) {
        return getActivatedSets(entity)
    },
    /**
     * 
     * @param {Internal.LivingEntity_} entity 
     * @param {String} setId
     * @returns 
     */
    isActive: function(entity,setId) {
        let sets = getActivatedSets(entity)
        return sets.find(t=>t.id == setId) != undefined
    }
}