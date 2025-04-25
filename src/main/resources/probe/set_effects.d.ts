/**
 * You need to create a new EffectiveSet instance to register the armor set.
 * @example let newSet = new EffectiveSet(["minecraft:leather_boots"],"leather")   newSet.setName("set.seteffects.leather")
 */
declare class EffectiveSet_ {
    constructor(items: [Internal.ItemStack_] | string[], id: string);
    id: string;
    name: string;
    items: [Internal.ItemStack_];
    counts: number;
    potionEffects: Array<{
        mobEffect: Internal.MobEffect_;
        amplifier: number;
        ambient: boolean;
        showParticles: boolean;
    }>;
    attributes: Array<{
        attribute: Internal.Attribute_;
        modifier: AttributeModifier;
        uuid: string;
    }>;
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

declare class SetsMap_ {
    sets: Map<any, EffectiveSet>;
    itemMap: Map<string, [EffectiveSet_]>;

    add(obj: any, set: EffectiveSet_): void;
    addItem(item: string | Internal.ItemStack_, set: EffectiveSet_): void;
}

declare class ShadowSetObject_ {
    constructor(id: string, name: string, items: Internal.ItemStack_[] | string[]);
    id: string;
    name: string;
    items: Internal.ItemStack_[];
}

declare class SetEffects_ {
    EffectiveSet_: typeof EffectiveSet_;
    setsMap: SetsMap;
    dataUpdater: DataUpdater;
    setRangeManager: SetRangeManager_;
    setEvents: SetEventJS;
    enableTick: boolean;
}
declare class DataUpdater {
    /**
     * After completing the creation of all armor sets,you should call the update method to synchronize the data.
     */
    update(map : SetsMap) : void
}

declare class SetsTooltipInjectHelper_ {
    hooks: {
        shift?: Record<string, TooltipCallback[]>;
        unshift?: Record<string, TooltipCallback[]>;
    };
    flags: {

    }


    injectShiftTooltipFunc(
        set: string | EffectiveSet,
        callback: TooltipCallback
    ): void;

    injectUnshiftTooltipFunc(
        set: string | EffectiveSet_,
        callback: TooltipCallback
    ): void;

    injectAlwaysTooltipFunc(
        set: string | EffectiveSet_,
        callback: TooltipCallback
    ): void;
    /**
     * 
     * @param set 
     * @param boolean 
     */
    setFlag(
        set: string | EffectiveSet_,
        boolean : Boolean
    ): void;
    /**
     * 
     * @param set
     *  
     */
    getFlag(
        set: string | EffectiveSet_
    ): boolean;

    triggerFactory(
        type: 'shift' | 'unshift',
        event: Internal.TooltipEvent_,
        item: Internal.ItemStack_,
        advance: Internal.AdvancedTooltip_,
        text: Internal.List<any>,
        set: EffectiveSet_
    ): void;
}

type TooltipCallback = (
    event: Internal.TooltipEvent_,
    item: Internal.ItemStack_,
    advance: Internal.AdvancedTooltip_,
    text: Internal.List<any>,
    set: EffectiveSet_,
    count: number
) => void;

declare class SetRangeManager_ {
    type: string
    blackList:object
    armor() : void
    weapon() : void
    armorAndWeapon() : void
    armorAndCurios() : void
    curios() : void
    all() : void
    getSlots(entity:Internal.LivingEntity_) : Internal.Iterable<Internal.ItemStack>
    addBlackList() : void
    removeBlackList() : void
    addBlackList(item : Internal.ItemStack_,slot : SlotTypes_ | string) : void
    removeBlackList(item : Internal.ItemStack_,slot : SlotTypes_ | string) : void
    inBlackList(item : Internal.ItemStack_,slot : SlotTypes_ | string) : void
    addWhiteList(item : Internal.ItemStack_,slot : SlotTypes_ | string) : void
}
declare class SlotTypes_ {
    ARMOR : string
    WEAPON : string
    CURIOS : string
}

declare class SetRegister_ {
    /**
     * This method will return a new EffectiveSet instance.
     * @param items 
     * @param id 
     */
    create(items : Internal.Iterable<Internal.ItemStack>,id : string) : EffectiveSet_
}
declare class SetModification_ {
    getSet(id : string) : EffectiveSet_
    getSetsFromItem(item : Internal.ItemStack_) : Array<EffectiveSet_>
    getMaps() : SetsMap_
}
declare class SetEventJS {
    /**
     * Use registry event to create a new armor set.
     * the create method will return a EffectiveSet instance
     * so you can directly edit to customized the set properties.
     */
    registry(callback:(event : SetRegister_) => void) : void
    /**
     * For the sets had been registered,you can use modification event to edit.
     * getSet method will return a set instance
     * getSets method will return a Array<EffectiveSet>
     * getMaps method will return the SetsMap,which has all infomations of the Sets.
     */
    modification(callback:(event : SetModification_) => void) : void
}
