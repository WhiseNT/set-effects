//priority:110

function fixResourceLocation(location) {
    return location

}

function transformToRoman(number) {
    switch (number) {
        case 1:
            return 'I'
        case 2:
            return 'II'
        case 3:
            return 'III'
        case 4:
            return 'IV'
        case 5:
            return 'V'
        case 6:
            return 'VI'
        case 7:
            return 'VII'
        case 8:
            return 'VIII'
        case 9:
            return 'IX'
        case 10:
            return 'X'
    }
    return number
}



const TooltipUtil = {
    /**
     * 
     * @param {Internal.List} text 
     * @param {Internal.MobEffect_} effect 
     * @param {Number} amplifier
     * @param {*} color 
     * @param {Text} additionalText
     */
    createPotionEffectTooltip:function (text,location,effect,amplifier,color,additionalText) {
        /**@type {Internal.MobEffect} */
        let effectFix = KLUtils.getClientRegistryAccess()
            .registryOrThrow(Registries.MOB_EFFECT)
            .get(fixResourceLocation(effect))
        if (effectFix == null) return text
        let effectLangKey = effectFix.getDescriptionId()
        let defaultColor = Color.BLUE
        let value = transformToRoman(amplifier+1)
        //一级不显示罗马数字
        if (amplifier == 0) {
            value = ""
        }
        if (!effectFix.isBeneficial()) {
            defaultColor = Color.RED
        }
        if (color != null) {
            defaultColor = color
        }
        let at = Text.empty()
        if (additionalText != null) {
            at = additionalText
        }
        
        let key = Text.translatable(effectLangKey)
        .append(Text.literal(" ").append(Text.of(value))).append(at).color(defaultColor)
        
        return text.add(location,key)
    },
    createAttributeTooltip:function (text,location,attribute,value,color,additionalText,isPercent) {
        let attributeFix = KLUtils.getClientRegistryAccess()
            .registryOrThrow(Registries.ATTRIBUTE)
            .get(fixResourceLocation(attribute))
        if (attributeFix == null) return text
        let defaultColor = Color.BLUE
        if (value < 0) {
            defaultColor = Color.RED
        }
        if (color != null) {
            defaultColor = color
        }
        let at = Text.empty()
        if (additionalText != null) {
            at = additionalText
        }
        let sign = "+"
        if (value < 0) {
            sign = "-"
            value = -value
        }
        if (isPercent) {
            value = value * 100

            value = value.toFixed(0).toString() + "%"
        } else {
            value = value.toString()
        }
        let key = Text.of(sign).append(value).append(" ").append(Text.translatable(attributeFix.getDescriptionId()))
        .append(at).color(defaultColor)
        
        return text.add(location,key)
    },
    transformToRoman:function (number) {
        return transformToRoman(number)
    }
}
