/**
 * 玩家的武器，伤害判定触发器
 */

import { BossModuleC } from "../module/bossModule/BossModule";

@Core.Class
export default class WeaponTrigger extends Core.Script {

    /**玩家正在攻击 */
    public isAttack: boolean = false;

    /**攻击到的物体guid（防止A一下触发多次掉血） */
    public attackObj: string[] = [];

    protected onStart(): void {
        (this.gameObject as Gameplay.Trigger).onEnter.add((other: Core.GameObject) => {
            // console.log(`[zzzz] 武器触碰到 ${other.guid}`);
            if (this.isAttack) {
                if (this.attackObj.includes(other.guid)) {
                    console.log(`[zzzz] 防止多次触发掉血，忽略了${other.guid}`);
                    return;
                }
                this.attackObj.push(other.guid);
                // console.log(`[zzzz] 在攻击状态`);
                if (other.tag == "Enemy") {
                    console.log(`[zzzz] 打中敌人 ${other.guid}`);
                    // other.visibility = (Type.PropertyStatus.Off);
                    other.worldLocation = new Type.Vector(0, 0, -1000);// TODO: 敌人身上绑脚本，血量属性
                }
                else if (other.tag == "Boss") {
                    console.log(`[zzzz] 打中Boss ${other.guid}`);
                    ModuleManager.getInstance().getModule(BossModuleC).lostHP(10);
                }
            }
        });
    }
}