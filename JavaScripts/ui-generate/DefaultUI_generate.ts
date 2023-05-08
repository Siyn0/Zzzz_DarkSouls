
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 橘色半夏
 * UI: UI/DefaultUI.ui
 * TIME: 2023.01.06-17.54.09
 */

 

 @UI.UICallOnly('UI/DefaultUI.ui')
 export default class DefaultUI_Generate extends UI.UIBehavior {
	 @UI.UIMarkPath('MWCanvas/mButton_Attack')
    public mButton_Attack: UI.StaleButton=undefined;
    

 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = UI.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.mButton_Attack.onClicked.add(()=>{
			Events.dispatchLocal("PlayButtonClick", "mButton_Attack");
		})
		this.initLanguage(this.mButton_Attack);
		this.mButton_Attack.touchMethod = (UI.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		

		//按钮多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas/MWButton_Interact") as any);
		
	
		this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas/MWButton_Jump") as any);
		
	
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
 