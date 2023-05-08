
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 橘色半夏
 * UI: UI/DarkSouls7/NormalUI.ui
 * TIME: 2023.01.06-17.54.09
 */

 

 @UI.UICallOnly('UI/DarkSouls7/NormalUI.ui')
 export default class NormalUI_Generate extends UI.UIBehavior {
	 @UI.UIMarkPath('MWCanvas_2147482460/mProgressBar_HP')
    public mProgressBar_HP: UI.ProgressBar=undefined;
    @UI.UIMarkPath('MWCanvas_2147482460/mProgressBar_MP')
    public mProgressBar_MP: UI.ProgressBar=undefined;
    @UI.UIMarkPath('MWCanvas_2147482460/mProgressBar_EP')
    public mProgressBar_EP: UI.ProgressBar=undefined;
    @UI.UIMarkPath('MWCanvas_2147482460/mText_Souls')
    public mText_Souls: UI.TextBlock=undefined;
    @UI.UIMarkPath('MWCanvas_2147482460/mText_SoulsLost')
    public mText_SoulsLost: UI.TextBlock=undefined;
    @UI.UIMarkPath('MWCanvas_2147482460/mCanvas_Tips/mText_Tips')
    public mText_Tips: UI.TextBlock=undefined;
    @UI.UIMarkPath('MWCanvas_2147482460/mCanvas_Tips')
    public mCanvas_Tips: UI.Canvas=undefined;
    @UI.UIMarkPath('MWCanvas_2147482460/mBtn_Attack')
    public mBtn_Attack: UI.Button=undefined;
    

 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = UI.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		//按钮添加点击
		
		this.mBtn_Attack.onClicked.add(()=>{
			Events.dispatchLocal("PlayButtonClick", "mBtn_Attack");
		})
		this.mBtn_Attack.touchMethod = (UI.ButtonTouchMethod.PreciseTap);
		
	

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_Souls)
		
	
		this.initLanguage(this.mText_SoulsLost)
		
	
		this.initLanguage(this.mText_Tips)
		
	
		//文本多语言
		
		this.initLanguage(this.uiWidgetBase.findChildByPath("MWCanvas_2147482460/MWTextBlock_1") as any);
		
	

	}
	private initLanguage(ui: UI.StaleButton | UI.TextBlock) {
        let call = UI.UIBehavior.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 