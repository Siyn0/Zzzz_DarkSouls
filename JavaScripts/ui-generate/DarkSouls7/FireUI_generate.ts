
/**
 * AUTO GENERATE BY UI EDITOR.
 * WARNING: DO NOT MODIFY THIS FILE,MAY CAUSE CODE LOST.
 * AUTHOR: 橘色半夏
 * UI: UI/DarkSouls7/FireUI.ui
 * TIME: 2023.01.06-17.54.09
 */

 

 @UI.UICallOnly('UI/DarkSouls7/FireUI.ui')
 export default class FireUI_Generate extends UI.UIBehavior {
	 @UI.UIMarkPath('MWCanvas_2147482460/mImg_BG')
    public mImg_BG: UI.Image=undefined;
    @UI.UIMarkPath('MWCanvas_2147482460/mCanvas_Menu/mText_FireName')
    public mText_FireName: UI.TextBlock=undefined;
    @UI.UIMarkPath('MWCanvas_2147482460/mCanvas_Menu/mBtn_TP')
    public mBtn_TP: UI.StaleButton=undefined;
    @UI.UIMarkPath('MWCanvas_2147482460/mCanvas_Menu/mBtn_Skill')
    public mBtn_Skill: UI.StaleButton=undefined;
    @UI.UIMarkPath('MWCanvas_2147482460/mCanvas_Menu/mBtn_Box')
    public mBtn_Box: UI.StaleButton=undefined;
    @UI.UIMarkPath('MWCanvas_2147482460/mCanvas_Menu/mBtn_Quit')
    public mBtn_Quit: UI.StaleButton=undefined;
    @UI.UIMarkPath('MWCanvas_2147482460/mCanvas_Menu')
    public mCanvas_Menu: UI.Canvas=undefined;
    

 
	protected onAwake() {
		//设置能否每帧触发onUpdate
		this.canUpdate = false;
		this.layer = UI.UILayerBottom;
		this.initButtons();
	}
	protected initButtons() {
		//按钮添加点击
		
		this.mBtn_TP.onClicked.add(()=>{
			Events.dispatchLocal("PlayButtonClick", "mBtn_TP");
		})
		this.initLanguage(this.mBtn_TP);
		this.mBtn_TP.touchMethod = (UI.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Skill.onClicked.add(()=>{
			Events.dispatchLocal("PlayButtonClick", "mBtn_Skill");
		})
		this.initLanguage(this.mBtn_Skill);
		this.mBtn_Skill.touchMethod = (UI.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Box.onClicked.add(()=>{
			Events.dispatchLocal("PlayButtonClick", "mBtn_Box");
		})
		this.initLanguage(this.mBtn_Box);
		this.mBtn_Box.touchMethod = (UI.ButtonTouchMethod.PreciseTap);
		
	
		this.mBtn_Quit.onClicked.add(()=>{
			Events.dispatchLocal("PlayButtonClick", "mBtn_Quit");
		})
		this.initLanguage(this.mBtn_Quit);
		this.mBtn_Quit.touchMethod = (UI.ButtonTouchMethod.PreciseTap);
		
	
		//按钮添加点击
		

		//按钮多语言
		
		//文本多语言
		
		this.initLanguage(this.mText_FireName)
		
	
		//文本多语言
		

	}
	private initLanguage(ui: UI.StaleButton | UI.TextBlock) {
        let call = UI.UIBehavior.getBehavior("lan");
        if (call && ui) {
            call(ui);
        }
    }
 }
 