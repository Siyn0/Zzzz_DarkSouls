import { GameConfig } from "./config/GameConfig";
import { BagModuleC, BagModuleS } from "./module/bagModule/BagModule";
import { BossModuleC, BossModuleS } from "./module/bossModule/BossModule";
import { PlayerModuleC, PlayerModuleS } from "./module/playerModule/PlayerModule";

@Core.Class
export default class GameStart extends Core.Script {

    @Core.Property()
    preloadAssets: string = this.getPreloadAssets();

    protected onStart(): void {
        this.onRegisterModule();
    }

    protected onRegisterModule(): void {
        console.log(`[zzzz] Hello World!`);
        ModuleManager.getInstance().registerModule(PlayerModuleS, PlayerModuleC, null);
        ModuleManager.getInstance().registerModule(BagModuleS, BagModuleC, null);
        ModuleManager.getInstance().registerModule(BossModuleS, BossModuleC, null);
    }

    getPreloadAssets(): string {
        let str: string = "29393";
        GameConfig.Assets.getAllElement().forEach(element => {
            str = str + "," + element;
        });
        return str;
    }
}
