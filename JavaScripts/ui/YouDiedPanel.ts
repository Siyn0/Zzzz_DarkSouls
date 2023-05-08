import YouDied_Generate from "../ui-generate/DarkSouls7/YouDied_generate";

export default class YouDiedPanel extends YouDied_Generate {

    /**透明度 */
    alpha: number = 0;
    /**正在死亡 */
    isDie: boolean = false;

    protected onShow(...params: any[]): void {
        this.alpha = 0;
        this.isDie = true;
        this.mImg_BG.renderOpacity = this.alpha;
        this.mImg_TextBG.renderOpacity =this.alpha;
        this.mText.contentColor = new LinearColor(255, 0, 0, this.alpha);
        this.mCanvas.visibility = (UI.SlateVisibility.Visible);
    }

    protected onUpdate(dt: number): void {
        if (this.isDie) {
            this.mImg_BG.imageColor = new LinearColor(0, 0, 0, this.alpha);
            this.mImg_TextBG.imageColor = new LinearColor(0, 0, 0, this.alpha);
            this.mText.contentColor = new LinearColor(255, 0, 0, this.alpha);

            this.alpha += 1;
            if (this.alpha >= 250) {
                this.isDie = false;
                setTimeout(() => {
                    this.mCanvas.visibility = (UI.SlateVisibility.Collapsed);
                }, 500);
            }
        }
    }
}