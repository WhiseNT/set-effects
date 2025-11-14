declare namespace SE {
    interface SetRegistryEventJS {
    create(items: Internal.Ingredient_[], id: string): EffectiveSet_;

  }
  interface SetModifacationEventJS {
    getSet(id: string): EffectiveSet_;
    getSetsFromItem(item: string): EffectiveSet_[];
    getMaps(): SetsMap;

  }
  interface SetServerConfigEventJS {
    getConfig(): SetEffectsServerConfig_;
    config: SetEffectsServerConfig_;
  }
    

    declare class SetEventJS {
        registry(event: (event: SetRegistryEventJS) => void): void;
        modification(event: (event: SetModifacationEventJS) => void): void;
        config(event: (event: SetServerConfigEventJS) => void): void;
    }
}