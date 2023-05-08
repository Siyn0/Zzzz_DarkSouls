import { PlayerModuleC } from "../module/playerModule/PlayerModule";
import FireUI_Generate from "../ui-generate/DarkSouls7/FireUI_generate";

/**坐火面板状态枚举 */
enum PanelState {
    /**全部隐藏的状态 */
    ALL_HIDE,

    /**刚坐下的状态（背景图渐显，没显示菜单） */
    BG_TO_ON,

    /**显示菜单的状态（背景图渐隐，显示菜单） */
    BG_TO_OFF
}
export default class FirePanel extends FireUI_Generate {

    /**初始颜色 */
    initColor: Type.LinearColor;

    /**当前状态 */
    currentState: PanelState = PanelState.ALL_HIDE;

    /**当前背景透明度 */
    currentAlpha: number = 0;

    protected onStart(): void {
        this.initColor = this.mImg_BG.imageColor;
        this.mCanvas_Menu.visibility = (UI.SlateVisibility.Collapsed);

        this.mBtn_Quit.onClicked.add(() => {
            ModuleManager.getInstance().getModule(PlayerModuleC).restStop();
        });
    }

    protected onShow(...params: any[]): void {
        this.mImg_BG.imageColor = (new Type.LinearColor(this.initColor.r, this.initColor.g, this.initColor.b, 0));
        this.currentState = PanelState.BG_TO_ON;
        this.mCanvas_Menu.visibility = (UI.SlateVisibility.Visible);
    }

    protected onHide(): void {
        this.mCanvas_Menu.visibility = (UI.SlateVisibility.Collapsed);
        this.currentAlpha = 0;
        // this.currentState = PanelState.ALL_HIDE;
    }

    protected onUpdate(dt: number): void {
        switch (this.currentState) {
            case PanelState.ALL_HIDE:
                return;
            case PanelState.BG_TO_ON:
                this.mImg_BG.imageColor = (new Type.LinearColor(this.initColor.r, this.initColor.g, this.initColor.b, this.currentAlpha));
                this.currentAlpha += dt;
                if (this.currentAlpha >= 1) {
                    this.mCanvas_Menu.visibility = (UI.SlateVisibility.Visible);
                    this.currentState = PanelState.BG_TO_OFF;
                }
                break;
            case PanelState.BG_TO_OFF:
                this.mImg_BG.imageColor = (new Type.LinearColor(this.initColor.r, this.initColor.g, this.initColor.b, this.currentAlpha));
                this.currentAlpha -= dt;
                if (this.currentAlpha <= 0) {
                    this.currentState = PanelState.ALL_HIDE;
                }
                break;
        }
    }
}
