//priority:101
function SetRegister() {

}
SetRegister.prototype.create = function(items,id) {
    return new EffectiveSet(items,id)
}
function SetEvents_ () {
    this.hooks = {}
}

SetEvents_.prototype.registry = function (event) {
    if (this.hooks["registry"] == undefined) this.hooks["registry"] = []
    this.hooks["registry"].push(event)
    this._triggerRegistry(setRegisterInstance)
}

SetEvents_.prototype._triggerRegistry = function (setRegisterInstance) {
    const reg = this.hooks["registry"]
    if (reg && reg.length > 0) {
        reg.forEach(event => {
            event({
                create: function (items, id) {
                    return setRegisterInstance.create(items, id);
                }
            });
        });
    }
    SetEffectsDataUpdater.update(map)
    
};
SetEvents_.prototype.modification = function (event) {
    if (this.hooks["modification"] == undefined) this.hooks["modification"] = []
    this.hooks["modification"].push(event)
    this._triggerModification()
}
SetEvents_.prototype._triggerModification = function() {
    const mdf = this.hooks["modification"]
    if (mdf && mdf.length > 0 ) {
        mdf.forEach(event=>{
            event({
                getSet: function (id) {
                    return map.sets.get(id)
                },
                getSetsFromItem: function(item) {
                    return map.itemMap[Item.of(item).id]
                },
                getMaps: function() {
                    return map
                }
            })
        })
    }
}
const setRegisterInstance = new SetRegister()
/**@type {SetEventJS} */
const SetEvents = new SetEvents_()
