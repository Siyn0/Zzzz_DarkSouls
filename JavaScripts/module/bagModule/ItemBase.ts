/**
 * 物品 抽象类
 */


export abstract class ItemBase extends Core.Script {

    constructor() {
        super(null);
    }
    
    abstract use(): void;
}