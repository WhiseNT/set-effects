//priority:101

function SetEvents_ () {
    this.hooks = {}
}

SetEvents_.prototype.registry = function (event) {
    if (this.hooks["registry"] == undefined) this.hooks["registry"] = []
    this.hooks["registry"].push(event)
    this._triggerRegistry(setRegisterInstance)
}
//不应该被外部调用
SetEvents_.prototype._triggerRegistry = function (setRegisterInstance) {
    const reg = this.hooks["registry"]
    if (reg && reg.length > 0) {
        reg.forEach(event => {
            event({
                create: function (items, id) {
                    let set = setRegisterInstance.create(items, id);
                    map.add(id, set);
                    console.log(set)
                    return set
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
//不应该被外部调用
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
SetEvents_.prototype.config = function (event) {
    if (this.hooks["config"] == undefined) this.hooks["config"] = []
    this.hooks["config"].push(event)
    this._triggerConfig()
}
//不应该被外部调用
SetEvents_.prototype._triggerConfig = function() {
    const cfg = this.hooks["config"]
    if (cfg && cfg.length > 0 ) {
        cfg.forEach(event=>{
            event({
                getConfig: function () {
                    return SetEffectsServerConfigInstance
                },
                config:SetEffectsServerConfigInstance
            })
        })
    }
}
/*
SetEvents_.prototype.equipment = function (set,event) {
    if (map.sets[set] == undefined) {
        console.warn("Set is Undefined")
        return
    } else {
        map.sets[set].hooks.equipt.push(event)
    }
}
SetEvents_.prototype.unequipment = function (set,event) {
    if (map.sets[set] == undefined) {
        console.warn("Set is Undefined")
        return
    } else {
        map.sets[set].hooks.unequipt.push(event)
    }
}
SetEvents_.prototype.hurt = function (set,event) {
    if (map.sets[set] == undefined) {
        console.warn("Set is Undefined")
        return
    } else {
        map.sets[set].hooks.hurt.push(event)
    }
}
SetEvents_.prototype.attack = function (set,event) {
    if (map.sets[set] == undefined) {
        console.warn("Set is Undefined")
        return
    } else {
        map.sets[set].hooks.attack.push(event)
    }
}
SetEvents_.prototype.tick = function (set,event) {
    if (map.sets[set] == undefined) {
        console.warn("Set is Undefined")
        return
    } else {
        map.sets[set].hooks.tick.push(event)
    }
}
SetEvents_.prototype.heal = function (set,event) {
    if (map.sets[set] == undefined) {
        console.warn("Set is Undefined")
        return
    } else {
        map.sets[set].hooks.heal.push(event)
    }
}
EffectiveSet.prototype.jump = function (set,event) {
    if (map.sets[set] == undefined) {
        console.warn("Set is Undefined")
        return
    } else {
        map.sets[set].hooks.jump.push(event)
    }
}
EffectiveSet.prototype.fall = function (set,event) {
    if (map.sets[set] == undefined) {
        console.warn("Set is Undefined")
        return
    }
    else {
        map.sets[set].hooks.fall.push(event)
    }
}
EffectiveSet.prototype.death = function (set,event) {
    if (map.sets[set] == undefined) {
        console.warn("Set is Undefined")
        return
    } else {
        map.sets[set].hooks.death.push(event)
    }
}
*/

/**@type {SE.SetEvents} */
const SetEventsInstance = new SetEvents_()
