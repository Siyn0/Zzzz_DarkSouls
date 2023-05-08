import NormalUI_Generate from "../ui-generate/DarkSouls7/NormalUI_generate";


/**xxx条，填充值枚举 */
export enum NormalUI_Bar {
    /**血条填充，范围0到1 */
    HP_BAR,

    /**蓝条填充，范围0到1 */
    MP_BAR,

    /**精力条填充，范围0到1 */
    EP_BAR
}

export class NormalUI extends NormalUI_Generate {
    /**死亡掉魂动画 */
    isDie: boolean = false;

    /**字体透明度 */
    textAlpha: number = 255;

    /**掉魂-123Text初始位置 x */
    textLocX: number = 0;
    /**掉魂-123Text初始位置 y */
    textLocY: number = 0;
    protected onStart(): void {
        // 初始隐藏掉魂Text
        this.mText_SoulsLost.visibility = (UI.SlateVisibility.Collapsed);

        this.textLocX = this.mText_SoulsLost.slot.position.x;
        this.textLocY = this.mText_SoulsLost.slot.position.y;
    }

    /**改变xx条的value，范围0到1 */
    changeBarValue(type: NormalUI_Bar, target: number) {
        switch (type) {
            case NormalUI_Bar.HP_BAR:
                this.mProgressBar_HP.currentValue = (target);
                break;
            case NormalUI_Bar.EP_BAR:
                this.mProgressBar_EP.currentValue = (target);
                break;
            case NormalUI_Bar.MP_BAR:
                this.mProgressBar_MP.currentValue = (target);
                break;
        }
    }

    /**玩家死亡，播放-123数字往上飘的动画，并且逐渐透明
   */
    textUp() {
        this.mText_SoulsLost.text = (`- ${this.mText_Souls.text}`);
        this.mText_Souls.text = (`0`);
        this.mProgressBar_HP.currentValue = (0);
        // this.mText_GemNum.setText((Number(this.mText_GemNum.text) + n).toString());
        this.isDie = true;
        this.mText_SoulsLost.visibility = (UI.SlateVisibility.Visible);
    }

    /**初始化掉魂-123 Text */
    async initSoulsLost() {
        this.mText_SoulsLost.visibility = (UI.SlateVisibility.Collapsed);
        await TimeUtil.delaySecond(0.5);
        this.mText_SoulsLost.position = (new Type.Vector2(this.textLocX, this.textLocY), this.mText_SoulsLost.size);
        this.textAlpha = 255;
        await TimeUtil.delaySecond(0.5);
        this.mText_SoulsLost.setFontColorDecimal(255, 255, 255, 255);
    }

    /**设置并显示Tips
     * @param 要显示的文字
     */
    setTips(text: string) {
        this.mText_Tips.text = (text);
        this.mCanvas_Tips.visibility = (UI.SlateVisibility.Visible);
    }

    /**隐藏Tips */
    hideTips() {
        this.mCanvas_Tips.visibility = (UI.SlateVisibility.Collapsed);
    }

    protected onUpdate(dt: number): void {
        if (this.isDie) {
            let transform = this.mText_SoulsLost.position;
            this.mText_SoulsLost.position = (new Type.Vector2(transform.x, transform.y - 1));
            this.textAlpha -= 5;
            this.mText_SoulsLost.setFontColorDecimal(255, 255, 255, this.textAlpha);

            if (this.textAlpha <= 10) {
                this.isDie = false;
                this.initSoulsLost();
            }
        }
    }
}