import { InteractType, PlayerModuleC } from "../module/playerModule/PlayerModule";
import { NormalUI } from "../ui/NormalUI";

@Core.Class
export default class FireTrigger extends Core.Script {

    protected onStart(): void {
        if (SystemUtil.isClient()) {
            (this.gameObject as Gameplay.Trigger).onEnter.add((other: Core.GameObject) => {
                if (((other) instanceof Gameplay.Character)) {
                    if (Gameplay.getCurrentPlayer().character == other as Gameplay.Character) {
                        UI.UIManager.instance.getUI(NormalUI).setTips(`在營火處休息`);
                        ModuleManager.getInstance().getModule(PlayerModuleC).currentInteract = InteractType.FIRE;
                        let location: Type.Vector = new Type.Vector(this.gameObject.worldLocation.x, this.gameObject.worldLocation.y, this.gameObject.worldLocation.z + 100);
                        ModuleManager.getInstance().getModule(PlayerModuleC).tempLocation = location;
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
