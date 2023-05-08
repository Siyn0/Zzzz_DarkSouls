import { ADD_EP_TIME, CLASH_ANIM, CLASH_TIME, DIE_ANIM, EP_EMPTY_ANIM, LB_ANIM, LT_ANIM, RUN_ANIM, SAFE_TIME, SIT_ANIM } from "../../Global";
import WeaponTrigger from "../../scriptInScene/WeaponTrigger";
import DefaultUI_Generate from "../../ui-generate/DefaultUI_generate";
import FirePanel from "../../ui/FirePanel";
import { NormalUI, NormalUI_Bar } from "../../ui/NormalUI";
import YouDiedPanel from "../../ui/YouDiedPanel";
import { BossModuleC } from "../bossModule/BossModule";
import { EnumBoss } from "../bossModule/EnumBoss";

/**交互（按E） 类型 枚举 */
export enum InteractType {
    /**空 */
    NULL,
    /**坐火 */
    FIRE,
    /**雾门 */
    FOG
}

export class PlayerModuleS extends ModuleS<PlayerModuleC, null>{
    onStart(): void {
        console.log(`[zzzz] PlayerModuleS Start`);
    }

    /**移动玩家到点Type.Vector(x,y,z) */
    net_TPPlayer(loc: Type.Vector) {
        this.currentPlayer.character.worldLocation = loc;
    }

    /**改变物体的碰撞状态 */
    net_ChangeCollision(obj: Core.GameObject) {
        obj.setCollision(Type.CollisionStatus.Off);
    }
}

export class PlayerModuleC extends ModuleC<PlayerModuleS, null>{

    /**主界面UI */
    private mainPanel: NormalUI;

    /**玩家角色 */
    private playerCha: Gameplay.Character;

    /**玩家拿着的武器 */
    private playerWeapon: Core.GameObject;

    /**武器挂的脚本 */
    private weaponScript: WeaponTrigger;

    /**正在死亡 */
    private isDie: boolean = false;

    /**正在跑 */
    private isRun: boolean = false;

    /**正在防御 */
    private isDefend: boolean = false;

    /**翻滚无敌帧（其实是秒数） */
    private clashTime: number = 0;

    /**是否正在翻滚 */
    private isClash: boolean = false;

    /**无敌状态（开门、进门等） */
    private isImmune: boolean = false;

    /**自动移动状态（进雾门） */
    private isAutoMove: boolean = false;

    /**当前自动移动的方向 */
    private moveDirection: Type.Vector;

    /**玩家当前血量 */
    private currentHP: number = 100;

    /**玩家当前蓝量 */
    private currentMP: number = 100;

    /**玩家当前精力 */
    private currentEP: number = 1;

    /**玩家总血量 */
    private maxHP: number = 100;

    /**玩家总蓝量 */
    private maxMP: number = 100;

    /**玩家总精力（能冲刺几秒） */
    private maxEP: number = 1;

    /**计时器，几秒后开始恢复精力 */
    private addEPTime: number = 0;

    /**当前存档点（火） */
    private respawnLocation: Type.Vector = new Type.Vector(4478.11, -9023.25, 1354.14);

    /**跑步动作anim */
    private animRun: Gameplay.Animation = null;

    // ------ 对外开放

    /**当前交互类型 */
    public currentInteract: InteractType = InteractType.NULL;

    /**当前交互物 */
    public currentInteractObj: Core.GameObject;

    /**当前到达的火的位置 */
    public tempLocation: Type.Vector = new Type.Vector(4478.11, -9023.25, 1354.14);

    onEnterScene(sceneType: number): void {
        console.log(`[zzzz] PlayerModuleC Start`);
        this.mainPanel = UI.UIManager.instance.getUI(NormalUI);
        UI.UIManager.instance.showUI(this.mainPanel);

        this.playerCha = this.currentPlayer.character;
        // 暂定武器只有流放
        this.playerWeapon = Core.GameObject.find(`6513162E`);
        this.init();
        this.playerCha.attach(this.playerWeapon, Gameplay.SlotType.RightHand);
        this.playerWeapon.setRelativeLocation(new Type.Vector(0, 0, 100));
        this.playerWeapon.setRelativeRotation(new Type.Rotation(0, 180, 0));

        InputUtil.onKeyDown(Type.Keys.RightMouseButton, () => {
            this.defend();
        });

        InputUtil.onKeyUp(Type.Keys.RightMouseButton, () => {
            this.defendStop();
        });

        InputUtil.onKeyDown(Type.Keys.Q, () => {
            this.lostHP(10);// TODO: 测试用，记得删
        });

        InputUtil.onKeyDown(Type.Keys.E, () => {
            this.interact();
        });

        InputUtil.onKeyPress(Type.Keys.SpaceBar, () => {
            if (!this.isRun && this.currentEP >= 0.2) {
                this.run();
            }
        });

        InputUtil.onKeyUp(Type.Keys.SpaceBar, () => {
            if (this.isRun) {
                this.resetMove();
            }
            else if (this.currentEP >= 0.2 && !this.isClash) {
                this.clash();
            }
        });

        let defaultUI: DefaultUI_Generate = UI.UIManager.instance.show(DefaultUI_Generate);
        defaultUI.mButton_Attack.onClicked.add(this.attack.bind(this));
    }

    /**初始化 */
    async init() {
        // this.weaponScript = await Core.Script.spawnScript(`2BBCE758458A18AE18DD528D6B02E7BA`) as WeaponTrigger;
        // let triggerBox: Gameplay.Trigger = Core.GameObject.find(`986AF6F6`) as Gameplay.Trigger;
        // this.weaponScript.gameObject = (triggerBox);
        this.weaponScript = (await Core.ScriptManager.asyncFindScript(`1594312E`)) as WeaponTrigger;
        console.log(`[zzzz] weaponScript:${this.weaponScript}`);
    }

    /**掉血 */
    lostHP(lostN: number) {
        if (this.isDie || this.isImmune) {
            return;
        }
        if (this.clashTime > 0 && this.clashTime <= SAFE_TIME) {
            return;
        }
        if (this.isDefend) {
            lostN /= 2;
            this.lostEP(0.3);
        }

        this.currentHP -= lostN;
        if (this.currentHP <= 0) {
            this.youDied();
        }
        else {
            this.mainPanel.changeBarValue(NormalUI_Bar.HP_BAR, this.currentHP / this.maxHP);
        }
    }

    /**死亡 */
    youDied() {
        console.log(`[zzzz] 你死了，太菜啦！`);
        this.isDie = true;
        this.playerCha.moveEnable = false;
        this.playerCha.playAnimation(DIE_ANIM, 5.5);
        this.mainPanel.changeBarValue(NormalUI_Bar.HP_BAR, 0);

        setTimeout(() => {
            // 一秒后弹掉魂Text
            UI.UIManager.instance.getUI(NormalUI).textUp();
            UI.UIManager.instance.show(YouDiedPanel);
        }, 1000);

        setTimeout(() => {
            // 5.5秒后显示加载界面，复活
            this.respawn();
        }, 5500);
    }

    /**复活 */
    respawn() {
        this.isDie = false;
        this.playerCha.moveEnable = true;
        this.rest(this.respawnLocation);
        UI.UIManager.instance.hide(YouDiedPanel);
        this.server.net_TPPlayer(this.respawnLocation);
    }

    /**坐火
     * @param location 火的位置
     */
    rest(location: Type.Vector) {
        if (this.isDie) {
            return;
        }
        this.resetMove();
        this.playerCha.playAnimation(SIT_ANIM, 9999);
        this.playerCha.moveEnable = false;
        UI.UIManager.instance.show(FirePanel);
        UI.UIManager.instance.hide(NormalUI);
        this.currentEP = this.maxEP;
        this.currentHP = this.maxHP;
        this.currentMP = this.maxMP;
        this.mainPanel.changeBarValue(NormalUI_Bar.HP_BAR, 1);
        this.mainPanel.changeBarValue(NormalUI_Bar.EP_BAR, 1);
        this.mainPanel.changeBarValue(NormalUI_Bar.MP_BAR, 1);
        this.setRespawnLocation(location);
    }

    /**从火边起身 */
    restStop() {
        this.playerCha.moveEnable = true;
        this.playerCha.stopAnimation(SIT_ANIM);
        UI.UIManager.instance.hide(FirePanel);
        UI.UIManager.instance.show(NormalUI);
    }

    // /**设置复活位置
    //  * @param location 位置 Type.Vector
    //  */
    // setRespawnLocation(location: Type.Vector);

    // /**
    //  * 设置复活位置
    //  * @param x 坐标x
    //  * @param y 坐标y
    //  * @param z 坐标z
    //  */
    // setRespawnLocation(x: number, y: number, z: number);

    /**
     * 设置复活位置，传入Type.Vector或者xyz三个数字（坐标）
     */
    setRespawnLocation(x?: Type.Vector | number, y?: number, z?: number) {
        if (x instanceof Number) {
            this.respawnLocation = new Type.Vector(x as number, y, z);
        }
        else if (x instanceof Type.Vector) {
            this.respawnLocation = x;
        }
    }

    /**进入雾门 */
    enterFog() {
        this.isImmune = true;
        // this.playerCha.playAnimation(ENTER_FOG);
        this.playerCha.maxWalkSpeed = 100;
        let direction: Type.Vector = this.focusInteractObj();
        this.moveDirection = direction;
        this.playerCha.worldRotation = new Type.Vector(direction.x, direction.y, 0).toRotation();
        // this.playerCha.rotateRate = 0;
        this.playerCha.movementDirection = Gameplay.MovementDirection.AxisDirection;
        this.isAutoMove = true;
        this.server.net_ChangeCollision(this.currentInteractObj);
        setTimeout(() => {
            this.isImmune = false;
            this.isAutoMove = false;
            // this.playerCha.rotateRate = 180;
            this.playerCha.maxWalkSpeed = 450;
            this.playerCha.movementDirection = Gameplay.MovementDirection.ControllerDirection;
            ModuleManager.getInstance().getModule(BossModuleC).onEnterFog(EnumBoss.Gundyr);
        }, 2500);
    }

    /**模拟移动输入 */
    moveCharacter() {
        if (this.isAutoMove) {
            // console.log(`[zzzz] 正在自动移动，方向:${this.moveDirection}`);
            this.playerCha.addMoveInput(this.moveDirection);
        }
    }

    /**玩家面朝交互物 */
    focusInteractObj() {
        let direction: Type.Vector = this.currentInteractObj.worldLocation.subtract(this.playerCha.worldLocation);
        return direction//.normalize();
        // this.playerCha.rotation = direction.toRotation();
    }

    /**开始冲刺 */
    run() {
        console.log(`[zzzz] 按下冲刺`);
        this.animRun = this.playerCha.playAnimation(RUN_ANIM, 0);
        this.playerCha.maxWalkSpeed = 1024;
        this.playerCha.maxAcceleration = 4096;
        this.isRun = true;
    }

    /**耗尽精力 */
    emptyEP() {
        this.isRun = false;
        // this.playerCha.stopAnimation(RUN_ANIM);
        this.playerCha.playAnimation(EP_EMPTY_ANIM);
        this.resetMove();
    }

    /**恢复正常移动 */
    resetMove() {
        console.log(`[zzzz] 恢复正常移动`);
        this.isRun = false;
        this.playerCha.maxWalkSpeed = 450;
        this.playerCha.maxAcceleration = 2048;
        if (this.animRun != null) {
            this.animRun.stop();
        }
    }

    /**冲刺精力条的变化 */
    checkEP(dt: number) {
        if (this.isRun) {
            this.currentEP -= dt / 3;
            this.changeEPBar();
        }
        else if (this.currentEP < this.maxEP) {
            if (this.addEPTime > ADD_EP_TIME) {
                // 如果没在冲刺，并且精力条不满，缓慢回复
                if (this.isDefend) {
                    // 如果正在举盾状态，精力条回得更慢
                    this.currentEP += dt / 9;
                }
                else {
                    // 没在举盾状态
                    this.currentEP += dt / 3;
                }
                this.changeEPBar();
            }
            this.addEPTime += dt;
        }
    }

    /**翻滚 */
    clash() {
        this.lostEP(0.2);
        this.playerCha.maxWalkSpeed = 5555;
        this.playerCha.maxAcceleration = 9999;
        this.playerCha.playAnimation(CLASH_ANIM, 1, 1.3);
        this.clashTime = 0;
        this.isClash = true;
    }

    /**翻滚后移动 */
    clashEnd() {
        this.playerCha.maxWalkSpeed = 100;
        this.playerCha.maxAcceleration = 100;
    }

    /**其他动作消耗精力
     * @param lost 消耗多少
     */
    lostEP(lost: number) {
        this.currentEP -= lost;
        this.addEPTime = 0;
        this.changeEPBar();
    }

    /**更新精力条，判断是否空精 */
    changeEPBar() {
        if (this.currentEP <= 0) {
            // 精力条耗尽
            this.emptyEP();
            this.mainPanel.mProgressBar_EP.currentValue = (0);
        }
        else {
            this.mainPanel.mProgressBar_EP.currentValue = (this.currentEP / this.maxEP);
        }
    }

    /**翻滚计时器 */
    checkClash(dt: number) {
        if (this.isClash) {
            this.clashTime += dt;
            if (this.clashTime >= SAFE_TIME) {
                this.clashEnd();
            }
            if (this.clashTime >= CLASH_TIME) {
                this.isClash = false;
                this.resetMove();
            }
        }
    }

    /**交互 */
    interact() {
        switch (this.currentInteract) {
            case InteractType.NULL:
                console.log(`[zzzz] 没有交互提示按nm呢`);
                break;
            case InteractType.FIRE:
                this.rest(this.tempLocation);
                break;
            case InteractType.FOG:
                this.enterFog();
                break;
            default:
                console.log(`[zzzz] 错误的交互类型：${this.currentInteract}`);
                break;
        }
    }

    /**攻击 */
    attack() {
        if (!this.isRun && this.playerCha.isPlayingAnimation()) {
            return;
        }
        if (this.currentEP <= 0.2) {
            return;
        }
        this.lostEP(0.3);
        this.playerCha.playAnimation(LT_ANIM);
        this.weaponScript.isAttack = true;
        setTimeout(() => {
            this.weaponScript.isAttack = false;
            this.weaponScript.attackObj = [];
        }, 500);
    }

    /**举盾 */
    defend() {
        if (this.playerCha.isPlayingAnimation()) {
            return;
        }
        this.playerCha.playAnimation(LB_ANIM, 9999);
        this.playerWeapon.setRelativeRotation(new Type.Rotation(-6, 180, 90));
        this.isDefend = true;
    }

    /**结束防御 */
    defendStop() {
        this.playerCha.stopAnimation(LB_ANIM);
        this.playerWeapon.setRelativeRotation(new Type.Rotation(0, 180, 0));
        this.isDefend = false;
    }

    onUpdate(dt: number): void {
        this.checkEP(dt);
        this.checkClash(dt);
        this.moveCharacter();
    }
}