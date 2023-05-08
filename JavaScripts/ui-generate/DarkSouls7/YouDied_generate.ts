
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 橘色半夏
 * UI: UI/DarkSouls7/YouDied.ui
 * TIME: 2023.01.06-17.54.09
 */

 

 @UI.UICallOnly('UI/DarkSouls7/YouDied.ui')
 export default class YouDied_Generate extends UI.UIBehavior {
	 @UI.UIMarkPath('mCanvas/mImg_BG')
    public mImg_BG: UI.Image=undefined;
    @UI.UIMarkPath('mCanvas/mImg_TextBG')
    public mImg_TextBG: UI.Image=undefined;
    @UI.UIMarkPath('mCanvas/mText')
    public mText: UI.TextBlock=undefined;
    @UI.UIMarkPath('mCanvas')
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
		
		this.initLanguage(this.mText)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: UI.StaleButton | UI.TextBlock) {
        let call = UI.UIBehavior.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 