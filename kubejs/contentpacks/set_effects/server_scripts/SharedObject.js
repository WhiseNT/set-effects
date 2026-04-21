//priority:100

function SharedObject() {
    this.EffectiveSet = EffectiveSet,
    this.setsMap = new SetsMap()
    this.setRangeManager = SetRangeManager;
    this.setEvents = SetEventsInstance;
    this.enableTick = true;
    this.SetApi = SetApi;
}
const Shared = new SharedObject()
ContentPacks.putShared('com.whisent.seteffects.SetEffects',Shared)
const map = Shared.setsMap