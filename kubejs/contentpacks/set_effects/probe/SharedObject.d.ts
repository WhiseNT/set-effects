declare namespace Internal {
    interface ContentPacksBinding {
        getShared(type:Internal.ScriptType_,id: FinalChannel): any;
    }

    interface channel {
        "com.whisent.seteffects.SetEffects":"",
        'com.whisent.seteffects.client.SetTooltipEvents':"",
    }

    type FinalChannel = keyof channel;
}
