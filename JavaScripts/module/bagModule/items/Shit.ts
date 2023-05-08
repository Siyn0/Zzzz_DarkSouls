import { SHIT_ANIM } from "../../../Global";
import { ItemBase } from "../ItemBase";

/**
 * 屎块
 */
export class Shit extends ItemBase {

    /**屎块 */
    shit: Core.GameObject;

    /**屎块移动目标[x,y] */
    shitTarget: number[] = [0, 0];

    /**屎块最初z值 */
    shitStartZ: number = 0;

    /**屎块抛物线z */
    z: number = 0;

    /**屎块落地特效 */
    shitEffect: Gameplay.Particle;

    /**正在播放屎块落地特效 */
    isPlayShitEffect: boolean = false;

    /**
     * @param playerC 玩家角色 
     * */

    constructor(private playerC: Gameplay.Character) {
        super();
        this.initShit();
    }

    /**初始化 */
    async initShit() {
        this.shit = await Core.GameObject.asyncFind(`E0EC133B`);
        this.shitEffect = await Core.GameObject.asyncFind(`710B057A`) as Gameplay.Particle;
    }

    use(): void {
        console.log(`[zzzz] 使用屎块！`);
        this.playerC.playAnimation(SHIT_ANIM);
        setTimeout(() => {
            this.shitTarget = [this.playerC.getForwardVector().x, this.playerC.getForwardVector().y];
            this.shit.setVisibility(Type.PropertyStatus.On);
            this.shit.worldLocation = this.playerC.worldLocation;
            this.shitStartZ = this.shit.worldLocation.clone().z;
            this.useUpdate = true;
        }, 500);

        setTimeout(() => {
            this.useUpdate = false;
            this.z = 0;
            this.shit.setVisibility(Type.PropertyStatus.Off);
        }, 1500);
    }

    onUpdate(dt: number) {
        this.z += dt * 10;
        this.shit.worldLocation = new Type.Vector(this.shit.worldLocation.x + this.shitTarget[0] * 10, this.shit.worldLocation.y + this.shitTarget[1] * 10, this.shit.worldLocation.z - (this.z) * (this.z));
        // if (this.shit.worldLocation.z <= 10 && !this.isPlayShitEffect) {
        if (this.shitStartZ - this.shit.worldLocation.z >= 50) {
            this.isPlayShitEffect = true;
            this.shitEffect.worldLocation = this.shit.worldLocation;
            this.shitEffect.play(() => {
                this.isPlayShitEffect = false;
                this.destroy();
            });
        }
    }

}