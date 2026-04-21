declare namespace SE {
    type DisplayType = 'shift' | 'unshift' | 'always'

    /**

    * 表示一个 tooltip 修改回调函数的上下文

    */

    interface ModifySetTooltipEventJS {

    /**

        * 隐藏指定物品的原版 Tooltip。

        * @param item 指定物品的 ID（如 "minecraft:leather_boots"）

        * @param key 触发条件，例如 'shift' 表示按住 Shift 时的行为

        * @param hide 是否隐藏（true = 隐藏）

        */

    hideItemTooltip(item: Internal.Ingredient_, key: DisplayType, hide: boolean): void;


    /**

        * 隐藏指定套装（set）的 Tooltip。

        * @param setID 套装 ID（如 "kubejs:leather_basic"）

        * @param key 触发条件，例如 'shift'

        * @param hide 是否隐藏

        */

    hideSetTooltip(setID: string, key: DisplayType, hide: boolean): void;

    //hideTagTooltip(tagID: Internal.Ingredient_, key: DisplayType, hide: boolean): void;
    }

    interface SetTooltipEvent {
        item:Internal.ItemStack_,
        text:Internal.List<any>,
        count:Number,
        set:string,
        advanced:boolean,
        event:Internal.ItemTooltipEventJS,
        util:TooltipUtil
    }

    interface TooltipUtil {
        createPotionEffectTooltip(text:Internal.List<any>,location:Number,effect:Internal.MobEffect_,amplifier:Number,color:Color,additionalText:Internal.Component_)
        createAttributeTooltip(text:Internal.List<any>,location:Number,attribute:Internal.Attribute,value:Number,color:Color,
            additionalText:Internal.Component_,isPercent:boolean)
        transformToRoman(number:Number)
    }




    /**

    * SetTooltipEvents 全局对象，用于注册 tooltip 修改逻辑

    */

    declare class SetTooltipEventJS {

        /**

            * 注册一个 tooltip 修改回调

            * @param callback 接收一个 SetTooltipEventJS 实例，在其中调用 hide 方法

            */

        modify(callback: (event: ModifySetTooltipEventJS) => void): void;
        
        shift(setId: string,callback:(event: SetTooltipEvent) => void): void;

        unshift(setId: string,callback:(event: SetTooltipEvent) => void): void;

        always(setId: string,callback:(event: SetTooltipEvent) => void): void;
    };
}

