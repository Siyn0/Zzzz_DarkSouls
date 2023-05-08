/**
 * 掉血触发器
 */

import { PlayerModuleC } from "../module/playerModule/PlayerModule";

@Core.Class
export default class DamageTrigger extends Core.Script {
    protected onStart(): void {
        (this.gameObject as Gameplay.Trigger).onEnter.add((other: Core.GameObject) => {
            if (((other) instanceof Gameplay.Character)) {
                if (Gameplay.getCurrentPlayer().character == other as Gameplay.Character) {
                    ModuleManager.getInstance().getModule(PlayerModuleC).lostHP(10);
                }
            }
        });
    }
}