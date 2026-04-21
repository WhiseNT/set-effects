//priority:1010
let CuriosFlag = Platform.isLoaded('curios')
let CuriosHelper = null
let $CuriosAPI = null

if (CuriosFlag) {
    $CuriosAPI = Java.loadClass('top.theillusivec4.curios.api.CuriosApi')
    CuriosHelper = {
        /**
         * 玩家饰品栏相关功能组
         */
        PlayerInv:{
            inv:function(player) {
                return $CuriosAPI.getCuriosInventory(player)
            },
            /**
             * 返回玩家所有已装备的饰品
             * @param {Internal.Player_} player 玩家
             */
            getEquippedCurios:function(player) {
                if (this.inv(player).isPresent()) {
                    return this.inv(player).resolve().get().getEquippedCurios().allItems
                }
                return []
                //return this.inv(player).getEquippedCurios().allItems
            }
        },
        check(entity) {
            return $CuriosAPI.getCuriosInventory(entity).isPresent()

        }
    }
}