declare namespace Internal {
    interface ContentPacksBinding {
        getShared(type:Internal.ScriptType_,id: "com.whisent.seteffects.SetEffects"): SE.SetEffectsShared;
        getShared(type:Internal.ScriptType_,id: 'com.whisent.seteffects.client.SetTooltipEvents'): SE.SetEventJS;
    }
}

declare namespace Internal {
    interface ContentPacksBinding {
        getShared(type:Internal.ScriptType_,id: "test1"): any;
        getShared(type:Internal.ScriptType_,id: "test2"): any;
    }

}
