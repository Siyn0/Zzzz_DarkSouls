
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 橘色半夏
 * UI: UI/AnimPause.ui
 * TIME: 2023.01.10-15.33.15
 */

 

 @UI.UICallOnly('UI/AnimPause.ui')
 export default class AnimPause_Generate extends UI.UIBehavior {
	 @UI.UIMarkPath('RootCanvas/mCanvas/mAnimGuid')
    public mAnimGuid: UI.InputBox=undefined;
    @UI.UIMarkPath('RootCanvas/mCanvas')
    public mCanvas: UI.Canvas=undefined;
    

 
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
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("RootCanvas/mCanvas/TextBlock") as any);
		
	

	}
	private initLanguage(ui: UI.StaleButton | UI.TextBlock) {
        let call = UI.UIBehavior.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 