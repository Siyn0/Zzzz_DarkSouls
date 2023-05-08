import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Name","Anime"],["","",""],[1,"DIE_ANIM ","8355"],[2,"RUN_ANIM ","14495"],[3,"EP_EMPTY_ANIM ","29738"],[4,"CLASH_ANIM ","95752"],[5,"SIT_ANIM ","14587"],[6,"LT_ANIM ","96578"],[7,"LB_ANIM ","33578"],[8,"SHIT_ANIM ","35425"]];
export interface IActionElement extends IElementBase{
 	/**ID*/
	ID:number
	/**名称*/
	Name:string
	/**动作GUID*/
	Anime:string
 } 
export class ActionConfig extends ConfigBase<IActionElement>{
	constructor(){
		super(EXCELDATA);
	}

}