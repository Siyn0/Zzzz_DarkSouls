import { InteractType, PlayerModuleC } from "../module/playerModule/PlayerModule";
import { NormalUI } from "../ui/NormalUI";

@Core.Class
export default class FogTrigger extends Core.Script {

    @Core.Property({ displayName: "交互目标，雾门（带碰撞的白色正方体）" })
    targetGuid: string = "38A87ED7";

    protected onStart(): void {
        if (SystemUtil.isClient()) {
            (this.gameObject as Gameplay.Trigger).onEnter.add((other: Core.GameObject) => {
                if (((other) instanceof Gameplay.Character)) {
                    if (Gameplay.getCurrentPlayer().character == other as Gameplay.Character) {
                        UI.UIManager.instance.getUI(NormalUI).setTips(`進入霧門`);
                        ModuleManager.getInstance().getModule(PlayerModuleC).currentInteract = InteractType.FOG;
                        ModuleManager.getInstance().getModule(PlayerModuleC).currentInteractObj = Core.GameObject.find(this.targetGuid);
                    }
                }
            });

            (this.gameObject as Gameplay.Trigger).onLeave.add((other: Core.GameObject) => {
                if (((other) instanceof Gameplay.Character)) {
                    if (Gameplay.getCurrentPlayer().character == other as Gameplay.Character) {
                        UI.UIManager.instance.getUI(NormalUI).hideTips();
                        ModuleManager.getInstance().getModule(PlayerModuleC).currentInteract = InteractType.NULL;
                    }
                }
            });
        }
    }
}
