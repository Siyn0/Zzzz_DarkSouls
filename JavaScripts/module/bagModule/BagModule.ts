import BagMain_Generate from "../../ui-generate/Bag/BagMain_generate";
import { ItemBase } from "./ItemBase";
import { Shit } from "./items/Shit";

export class BagModuleS extends ModuleS<BagModuleC, null>{

}

export class BagModuleC extends ModuleC<BagModuleS, null>{
    /**当前可使用物品 */
    public isUseable: boolean = true;

    /**当前快捷栏的物品 */
    currentItem: ItemBase;

    onEnterScene(sceneType: number): void {
        UI.UIManager.instance.show(BagMain_Generate);

        this.currentItem = new Shit(this.currentPlayer.character);

        InputUtil.onKeyDown(Type.Keys.R, () => {
            this.useItem();
        });

        InputUtil.onKeyDown(Type.Keys.MouseScrollDown, () => {
            // TODO:切换物品
        });
    }

    useItem() {
        if (this.isUseable) {
            this.currentItem.use();
        }
    }
}