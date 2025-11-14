declare namespace Internal {
    interface ContentPacksBinding {

        getShared(type: "server", id: "com.whisent.seteffects.SetEffects"): SE.SetEffectsShared;
        getShared(type: "client", id: "com.whisent.seteffects.client.SetTooltipEvents"): SE.SetTooltipEventJS;
        
        getShared(type:Internal.ScriptType_,id: FinalChannel): any;
    }

    interface channel {
        "com.whisent.seteffects.SetEffects":"",
        'com.whisent.seteffects.client.SetTooltipEvents':"",
    }

    type FinalChannel = keyof channel;
}
declare namespace SE { 
    declare class SetEffectsShared {
        public EffectiveSet: EffectiveSet;
        public setsMap: SetsMap;
        public setApi: SetApi;
        public setEvents: SetEventJS;
    }
}