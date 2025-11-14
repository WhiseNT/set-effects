//priority:100

/**
 * 用于存储所有套装信息的表,会根据该表内注册的信息来获取对应的套装
 */
function SetsMap() {
    //id→set
    this.sets = Utils.newMap()
    //item→set
    this.itemMap = Utils.newMap()
    //tag→set
    this.tagMap = Utils.newMap()
    //item→tag
    this.itemTagMap = Utils.newMap()
}
/**
 * 
 * @param {String} id 
 * @param {EffectiveSet} set 
 * 用于添加套装到表中
 */
SetsMap.prototype.add = function(id,set) {
    this.sets.put(id,set)
}
SetsMap.prototype.addItem = function(item,set) {
    if (this.itemMap[item] == undefined) {
        this.itemMap.put(item,[])
    }
    
    if (this.itemMap[item].find(t=>t.id == set.id) == undefined) {
        this.itemMap[item].push(set)
    }
}
/**
 * 
 * @param {Internal.TagKey_} tag 
 * @param {EffectiveSet} set 
 */
SetsMap.prototype.addTag = function(tag,set) {
    if (this.tagMap[tag] == undefined) {
        this.tagMap.put(tag,[])
    }
    
    if (this.tagMap[tag].find(t=>t.id == set.id) == undefined) {
        this.tagMap[tag].push(set)
    }
    Ingredient.of(tag).getItemIds().forEach(item=>{
        this.addItem(item,set)
        if (this.itemTagMap[item] == undefined) {
        this.itemTagMap.put(item,[])
    }
    if (this.itemTagMap[item].find(t=>t.id == set.id) == undefined) {
        this.itemTagMap[item].push(set)
    }
    })

    
}
