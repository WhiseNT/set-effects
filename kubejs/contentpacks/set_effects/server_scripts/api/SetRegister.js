//priority:102
function SetRegister() {

}
/**
 * 
 * @param {Array} items 
 * @param {String} id 
 * @returns 
 */
SetRegister.prototype.create = function(items,id) {
    if (!id.includes(":")) {
        id = "kubejs:" + id
    }
    return new EffectiveSet(items,id)
}

const setRegisterInstance = new SetRegister()
