import BossBlood_Generate from "../../ui-generate/DarkSouls7/BossBlood_generate";
import { EnumBoss } from "./EnumBoss";

export class BossModuleS extends ModuleS<BossModuleC, null>{

    /**正在进行boss战 */
    isBossRoom: boolean = false;

    /**Boss身体（躯干、整体的父节点） */
    bossBody: Core.GameObject;

    /**火主 */
    hostPlayer: Gameplay.Player;

    /**当前正在攻击的玩家 */
    bossTargetPlayer: Gameplay.Player;

    /**仇恨计时器 */
    bossTime: number = 0;

    /**移动计时器 */
    moveTime: number = 0;

    net_SetCurrentBoss(boss: EnumBoss) {
        switch (boss) {
            case EnumBoss.Gundyr:
                this.bossBody = Core.GameObject.find(`92979037`);
                this.bossTargetPlayer = this.currentPlayer;
                this.hostPlayer = this.currentPlayer;
                this.isBossRoom = true;
                break;

            default:
                break;
        }
    }

    /**让Boss面向正在攻击的玩家 */
    bossFacePlayer() {
        // console.log(`[zzzz] boss面向玩家 ${this.bossTargetPlayer.character.characterName} ， 当前rotation：${this.bossBody.worldRotation.z}`);
        let direction: Type.Rotation = ((this.bossTargetPlayer.character.worldLocation.clone()).subtract(this.bossBody.worldLocation.clone())).toRotation();
        this.bossBody.worldRotation = new Type.Rotation(0, 0, direction.z);
    }

    /**Boss向玩家移动 */
    bossMoveToPlayer(dt: number) {
        let legL: Core.GameObject = this.bossBody.getChildByName(`左腿关节`);
        let legR: Core.GameObject = this.bossBody.getChildByName(`右腿关节`);
        this.moveTime += dt * 10;
        legL.relativeRotation = new Type.Rotation(0, MathUtil.sin(this.moveTime) * 30, 0);
        legR.relativeRotation = new Type.Rotation(0, -MathUtil.sin(this.moveTime) * 30, 0);
        // console.log(`[zzzz] boss移动，向前向量是${this.bossBody.forwardVector}`);
        this.bossBody.worldLocation = this.bossBody.worldLocation.clone().add(this.bossBody.forwardVector.multiply(10));
    }

    /**Boss停在原地准备攻击 */
    bossStopMove(dt: number) {
        let legL: Core.GameObject = this.bossBody.getChildByName(`左腿关节`);
        let legR: Core.GameObject = this.bossBody.getChildByName(`右腿关节`);
        legL.relativeRotation = new Type.Rotation(0, MathUtil.lerp(legL.relativeRotation.y, 0, dt * 10), 0);
        legR.relativeRotation = new Type.Rotation(0, MathUtil.lerp(legR.relativeRotation.y, 0, dt * 10), 0);
    }

    onUpdate(dt: number): void {
        if (this.isBossRoom) {
            this.bossFacePlayer();
            if ((this.bossBody.worldLocation.clone()).subtract(this.bossTargetPlayer.character.worldLocation.clone()).length > 200) {
                this.bossMoveToPlayer(dt);
            }
            else {
                this.bossStopMove(dt);
            }
            // console.log(`[zzzz] Boss和玩家的距离${(this.bossBody.worldLocation.clone()).subtract(this.bossTargetPlayer.character.worldLocation.clone()).length}`);
        }
    }
}

export class BossModuleC extends ModuleC<BossModuleS, null>{

    /**Boss战血条UI */
    panel: BossBlood_Generate;

    /**当前在打的boss 总血量 */
    maxHP: number = 500;

    /**当前在打的boss 当前血量 */
    currentHP: number = 500;



    /**打中boss 掉血 */
    lostHP(n: number) {
        this.currentHP -= n;
        if (this.currentHP < 0) {
            // TODO: 胜利动画
        }
        this.changeBar(this.currentHP / this.maxHP);
    }

    onEnterScene(sceneType: number): void {
        this.panel = UI.UIManager.instance.getUI(BossBlood_Generate);
    }

    async onEnterFog(boss: number) {
        this.server.net_SetCurrentBoss(boss);
        switch (boss) {
            case EnumBoss.Gundyr:
                this.panel.mText_Name.text = ("灰燼審判者 古達");
                break;

            default:
                break;
        }
        UI.UIManager.instance.showUI(this.panel);

    }

    /**改血条填充 */
    changeBar(n: number) {
        this.panel.mBar_Blood.currentValue = (n);
    }
}