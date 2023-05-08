
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 橘色半夏
 * UI: UI/Bag/BagMain.ui
 * TIME: 2023.01.06-17.54.09
 */

 

 @UI.UICallOnly('UI/Bag/BagMain.ui')
 export default class BagMain_Generate extends UI.UIBehavior {
	 @UI.UIMarkPath('MWCanvas_2147482460/MWCanvas_1/mImg_Up_BG')
    public mImg_Up_BG: UI.Image=undefined;
    @UI.UIMarkPath('MWCanvas_2147482460/MWCanvas_1/mImg_Left_BG')
    public mImg_Left_BG: UI.Image=undefined;
    @UI.UIMarkPath('MWCanvas_2147482460/MWCanvas_1/mImg_Right_BG')
    public mImg_Right_BG: UI.Image=undefined;
    @UI.UIMarkPath('MWCanvas_2147482460/MWCanvas_1/mImg_Down_BG')
    public mImg_Down_BG: UI.Image=undefined;
    @UI.UIMarkPath('MWCanvas_2147482460/MWCanvas_1/mImg_Up')
    public mImg_Up: UI.Image=undefined;
    @UI.UIMarkPath('MWCanvas_2147482460/MWCanvas_1/mImg_Left')
    public mImg_Left: UI.Image=undefined;
    @UI.UIMarkPath('MWCanvas_2147482460/MWCanvas_1/mImg_Right')
    public mImg_Right: UI.Image=undefined;
    @UI.UIMarkPath('MWCanvas_2147482460/MWCanvas_1/mImg_Down')
    public mImg_Down: UI.Image=undefined;
    

 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = UI.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		//文本多语言
		

	}
	private initLanguage(ui: UI.StaleButton | UI.TextBlock) {
        let call = UI.UIBehavior.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 