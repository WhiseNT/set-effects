declare namespace SE {
    /**
 * You need to create a new EffectiveSet instance to register the armor set.
 * @example let newSet = new EffectiveSet(["minecraft:leather_boots"],"leather")   newSet.setName("set.seteffects.leather")
 */
declare class EffectiveSet_ {
    constructor(items: [Internal.ItemStack_] | string[], id: string);
    id: string;
    items: [Internal.Ingredient_];
    /**
     * Number of pieces for the set to take effect
     */
    counts: number;
    /**
     * Storage all the potion effects for the set.
     */
    potionEffects: Array<{
        mobEffect: Internal.MobEffect_;
        amplifier: number;
        ambient: boolean;
        showParticles: boolean;
    }>;
    /**
     * Storage all the attributes for the set.
     */
    attributes: Array<{
        attribute: Internal.Attribute_;
        modifier: AttributeModifier;
        uuid: string;
    }>;
    /**
     * Storage all the hooks for the set.
     */
    hooks: {
        effect: Array<(event: any, set: EffectiveSet) => void>;
        hurt: Array<(event: Internal.LivingHurtEvent_, set: EffectiveSet) => void>;
        heal: Array<(event: Internal.LivingHealEvent_, set: EffectiveSet) => void>;
        attack: Array<(event: Internal.LivingAttackEvent_, set: EffectiveSet) => void>;
        tick: Array<(event: Internal.PlayerTickEvent_, set: EffectiveSet) => void>;
        fall: Array<(event: Internal.LivingFallEvent_, set: EffectiveSet) => void>;
        jump: Array<(event: Internal.LivingJumpEvent_, set: EffectiveSet) => void>;
        spawn: Array<(event: any, set: EffectiveSet) => void>;
        death: Array<(event: Internal.LivingDeathEvent_, set: EffectiveSet) => void>;
        equipt: Array<(event: any, set: EffectiveSet) => void>;
        unequipt: Array<(event: any, set: EffectiveSet) => void>;
        active: Array<(event: any, set: EffectiveSet) => void>;
    };
    shadow: ShadowSetObject;

    getShadow(): ShadowSetObject;
    setName(name: string): EffectiveSet_;
    setCounts(number: number): EffectiveSet_
    addPotionEffect(
        mobEffect: Internal.MobEffect_,
        amplifier: number,
        ambient: boolean,
        showParticles: boolean
    ): EffectiveSet_;
    addAttribute(
        attribute: Internal.Attribute_,
        uuid: string,
        d: number,
        operation: Internal.AttributeModifier$Operation_
    ): EffectiveSet_;
    triggerFactory(eventType: keyof EffectiveSet_['hooks'], event: Internal.ForgeEventWrapper_, set: EffectiveSet_): void;
    injectHurtFunc(callback: (event: Internal.LivingHurtEvent_, set: EffectiveSet_) => void): EffectiveSet_;
    injectAttackFunc(callback: (event: Internal.LivingAttackEvent_, set: EffectiveSet_) => void): EffectiveSet_;
    injectEquiptFunc(callback: (event: Internal.LivingEquipmentChangeEvent_, set: EffectiveSet_) => void): EffectiveSet_;
    injectUnequiptFunc(callback: (event: Internal.LivingEquipmentChangeEvent_, set: EffectiveSet_) => void): EffectiveSet_;
    injectTickFunc(callback: (event: Internal.LivingEvent$LivingTickEvent_, set: EffectiveSet_) => void): EffectiveSet_;
    injectHealFunc(callback: (event: Internal.LivingHealEvent_, set: EffectiveSet_) => void): EffectiveSet_;
    injectJumpFunc(callback: (event: Internal.LivingEvent$LivingJumpEvent_, set: EffectiveSet_) => void): EffectiveSet_;
    injectFallFunc(callback: (event: Internal.LivingFallEvent_, set: EffectiveSet_) => void): EffectiveSet_;
    injectDeathFunc(callback: (event: Internal.LivingDeathEvent_, set: EffectiveSet_) => void): EffectiveSet_;
}
}