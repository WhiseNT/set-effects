declare namespace SE {
    interface SetRegistryEventJS {

    /**

     * 创建一个新的装备套装

     * @param items 物品列表，支持标签（如 #forge:armors/helmets）和具体物品 ID，但是不要用Item.of

     * @param id 套装的唯一标识符（如 "leather_basic"）

     */

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
        /**
         * 注册一个套装
         */
        registry(event: (event: SetRegistryEventJS) => void): void;
        modification(event: (event: SetModifacationEventJS) => void): void;
        config(event: (event: SetServerConfigEventJS) => void): void;
    }
}