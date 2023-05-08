import AnimPause_Generate from "./ui-generate/AnimPause_generate";

@Core.Class
export default class AnimPause extends Core.Script {

    /**当前正在播放的动画 */
    private currentAnim: Gameplay.Animation = null;

    /**用来输入动画guid的UI */
    private panel: AnimPause_Generate = null;

    /**镜头跟随目标物体 */
    private cameraTarget: Core.GameObject = null;

    /**玩家的角色 */
    private playerCha: Gameplay.Character = null;

    /**按了暂停，现在是拍照模式 */
    private isPhoto: boolean = false;

    /**用来存初始的摄像机碰撞参数，拍照结束后恢复初始的参数 */
    private cameraCollison: boolean = true;

    /**用来存初始的摄像机弹簧臂长度，拍照结束后恢复初始的参数 */
    private cameraLength: number = 0;

    protected onStart(): void {
        this.initObj();
    }
    async initObj() {
        if (SystemUtil.isServer()) {
            return;
        }

        this.panel = UI.UIManager.instance.show(AnimPause_Generate);
        this.cameraTarget = await Core.GameObject.asyncSpawnGameObject(`7669`);// 拍照模式镜头跟随的无碰撞隐藏物体
        this.cameraTarget.setVisibility(Type.PropertyStatus.Off);
        this.playerCha = Gameplay.getCurrentPlayer().character;
        this.cameraCollison = this.playerCha.cameraSystem.cameraCollisionEnable;// 存初始的摄像机是否碰撞参数
        this.cameraLength = this.playerCha.cameraSystem.targetArmLength;

        // 暂停动画（进入拍照模式）
        InputUtil.onKeyDown(Type.Keys.P, () => {
            if (this.currentAnim != null) {
                this.currentAnim.pause();
            }
            this.panel.mCanvas.visibility = UI.SlateVisibility.Collapsed;// 暂停进入拍照模式，隐藏UI
            // 拍照模式的镜头目标物体位置设为玩家角色位置
            this.cameraTarget.worldLocation = this.playerCha.worldLocation;
            this.playerCha.cameraSystem.setCameraFollowTarget(this.cameraTarget);
            this.playerCha.cameraSystem.cameraCollisionEnable = false;// 关闭摄像机碰撞，防止截图时卡墙上
            this.playerCha.cameraSystem.targetArmLength = 0;
            this.playerCha.moveEnable = false;
            this.isPhoto = true;
        });

        // 继续动画（退出拍照模式）
        InputUtil.onKeyDown(Type.Keys.R, () => {
            if (this.currentAnim != null) {
                this.currentAnim.resume();
            }
            this.playerCha.cameraSystem.setOverrideCameraRotation(Type.Rotation.zero);
            setTimeout(() => {
                this.playerCha.cameraSystem.resetOverrideCameraRotation();
            }, 100);
            this.panel.mCanvas.visibility = UI.SlateVisibility.Visible;// 退出拍照模式，显示UI
            this.playerCha.cameraSystem.setCameraFollowTarget(this.playerCha);
            this.playerCha.cameraSystem.cameraCollisionEnable = this.cameraCollison;//摄像机碰撞回到初始值
            this.playerCha.cameraSystem.targetArmLength = this.cameraLength;
            this.playerCha.moveEnable = true;
            this.isPhoto = false;
        });

        // 鼠标滚轮向上滑，动作加速
        InputUtil.onKeyDown(Type.Keys.MouseScrollUp, () => {
            if (this.currentAnim != null) {
                this.currentAnim.rate += 0.05;
            }
        });

        // 鼠标滚轮向下滑，动作减速
        InputUtil.onKeyDown(Type.Keys.MouseScrollDown, () => {
            if (this.currentAnim != null) {
                this.currentAnim.rate -= 0.05;
            }
        });

        // 播放动画
        InputUtil.onKeyDown(Type.Keys.V, () => {
            let animGuid: string = this.panel.mAnimGuid.text;
            this.currentAnim = this.playerCha.playAnimation(animGuid, 0, 1);
        });

        // 拍照模式移动镜头位置
        InputUtil.onKeyPress(Type.Keys.W, () => {
            this.cameraW();
        });
        InputUtil.onKeyDown(Type.Keys.W, () => {// press和down都写一下，防止响应慢
            this.cameraW();
        });

        // 拍照模式移动镜头位置
        InputUtil.onKeyPress(Type.Keys.S, () => {
            this.cameraS();
        });
        InputUtil.onKeyDown(Type.Keys.S, () => {
            this.cameraS();
        });

        // 拍照模式移动镜头位置
        InputUtil.onKeyPress(Type.Keys.A, () => {
            this.cameraA();
        });
        InputUtil.onKeyDown(Type.Keys.A, () => {
            this.cameraA();
        });

        // 拍照模式移动镜头位置
        InputUtil.onKeyPress(Type.Keys.D, () => {
            this.cameraD();
        });
        InputUtil.onKeyDown(Type.Keys.D, () => {
            this.cameraD();
        });

        // 拍照模式镜头旋转
        InputUtil.onKeyDown(Type.Keys.Q, () => {
            this.cameraQ();
        });
        InputUtil.onKeyPress(Type.Keys.Q, () => {
            this.cameraQ();
        });

        // 拍照模式镜头旋转
        InputUtil.onKeyDown(Type.Keys.E, () => {
            this.cameraE();
        });
        InputUtil.onKeyPress(Type.Keys.E, () => {
            this.cameraE();
        });
        InputUtil.onKeyUp(Type.Keys.Q, () => {
            this.playerCha.cameraSystem.resetOverrideCameraRotation();
        });
        InputUtil.onKeyUp(Type.Keys.Q, () => {
            this.playerCha.cameraSystem.resetOverrideCameraRotation();
        });
        InputUtil.onKeyUp(Type.Keys.E, () => {
            this.playerCha.cameraSystem.resetOverrideCameraRotation();
        });
        InputUtil.onKeyUp(Type.Keys.E, () => {
            this.playerCha.cameraSystem.resetOverrideCameraRotation();
        });
    }

    cameraW() {
        if (!this.isPhoto) {
            return;
        }
        let currentLoc: Type.Vector = this.cameraTarget.worldLocation.clone();
        this.cameraTarget.worldLocation = currentLoc.add(Gameplay.getShootDir(this.playerCha, currentLoc).normalized.multiply(10));
    }

    cameraS() {
        if (!this.isPhoto) {
            return;
        }
        let currentLoc: Type.Vector = this.cameraTarget.worldLocation.clone();
        this.cameraTarget.worldLocation = currentLoc.subtract(Gameplay.getShootDir(this.playerCha, currentLoc).normalized.multiply(10));
    }

    cameraA() {
        if (!this.isPhoto) {
            return;
        }
        let currentLoc: Type.Vector = this.cameraTarget.worldLocation.clone();
        let forward: Type.Vector = Gameplay.getShootDir(this.playerCha, currentLoc).normalized.multiply(10).clone();
        this.cameraTarget.worldRotation = forward.toRotation();
        let right: Type.Vector = this.cameraTarget.getRightVector().normalized;
        this.cameraTarget.worldLocation = currentLoc.subtract(right.multiply(10));
    }

    cameraD() {
        if (!this.isPhoto) {
            return;
        }
        let currentLoc: Type.Vector = this.cameraTarget.worldLocation.clone();
        let forward: Type.Vector = Gameplay.getShootDir(this.playerCha, currentLoc).normalized.multiply(10).clone();
        this.cameraTarget.worldRotation = forward.toRotation();
        let right: Type.Vector = this.cameraTarget.getRightVector().normalized;
        this.cameraTarget.worldLocation = currentLoc.add(right.multiply(10));
    }

    cameraQ() {
        if (!this.isPhoto) {
            return;
        }
        let currentRot: Type.Rotation = this.playerCha.cameraSystem.transform.rotation.clone();
        // let currentForward: Type.Vector = this.playerCha.cameraSystem.cameraWorldTransform.getForwardVector().clone();
        // this.playerCha.cameraSystem.cameraWorldTransform.rotate(currentForward, 10);
        this.playerCha.cameraSystem.setOverrideCameraRotation(new Type.Rotation(currentRot.x - 1, currentRot.y, currentRot.z))
    }

    cameraE() {
        if (!this.isPhoto) {
            return;
        }
        // let currentForward: Type.Vector = this.playerCha.cameraSystem.cameraWorldTransform.getForwardVector().clone();
        // this.playerCha.cameraSystem.cameraWorldTransform.rotate(currentForward, -10);
        let currentRot: Type.Rotation = this.playerCha.cameraSystem.transform.rotation.clone();
        this.playerCha.cameraSystem.setOverrideCameraRotation(new Type.Rotation(currentRot.x + 1, currentRot.y, currentRot.z))
    }
}