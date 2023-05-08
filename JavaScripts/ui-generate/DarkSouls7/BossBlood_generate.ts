
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 橘色半夏
 * UI: UI/DarkSouls7/BossBlood.ui
 * TIME: 2023.01.06-17.54.09
 */

 

 @UI.UICallOnly('UI/DarkSouls7/BossBlood.ui')
 export default class BossBlood_Generate extends UI.UIBehavior {
	 @UI.UIMarkPath('MWCanvas_2147482460/mBar_Blood')
    public mBar_Blood: UI.ProgressBar=undefined;
    @UI.UIMarkPath('MWCanvas_2147482460/mText_Name')
    public mText_Name: UI.TextBlock=undefined;
    

 
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
		
		this.initLanguage(this.mText_Name)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: UI.StaleButton | UI.TextBlock) {
        let call = UI.UIBehavior.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 