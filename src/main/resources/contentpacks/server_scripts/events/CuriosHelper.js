//priority:110
//requires: curios
const $CuriosAPI = Java.loadClass('top.theillusivec4.curios.api.CuriosApi')
let CuriosHelper = {
    /**
     * 玩家饰品栏相关功能组
     */
    PlayerInv:{
        /**
         * 返回玩家的饰品Inventory
         * @param {Internal.Player_} player 玩家
         */
        inv:function(player) {
            return $CuriosAPI.getCuriosInventory(player).resolve().get()
        },
        /**
         * 返回玩家所有已装备的饰品
         * @param {Internal.Player_} player 玩家
         */
        getEquippedCurios:function(player) {
            /**@type {Internal.CuriosApi_} */
            return this.inv(player).getEquippedCurios().allItems
        }
    }
}