declare namespace SE {
    type DisplayType = 'shift' | 'unshift' | 'always'


    interface ModifySetTooltipEventJS {


    hideItemTooltip(item: Internal.Ingredient_, key: DisplayType, hide: boolean): void;



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


    declare class SetTooltipEventJS {

        modify(callback: (event: ModifySetTooltipEventJS) => void): void;
        
        shift(setId: string,callback:(event: SetTooltipEvent) => void): void;

        unshift(setId: string,callback:(event: SetTooltipEvent) => void): void;

        always(setId: string,callback:(event: SetTooltipEvent) => void): void;
    };
}

