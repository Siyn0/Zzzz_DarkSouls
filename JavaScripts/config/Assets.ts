import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["ID","Name","Anime"],["","",""],[1,"DIE_ANIM ","8355"],[2,"RUN_ANIM ","14495"],[3,"EP_EMPTY_ANIM ","29738"],[4,"CLASH_ANIM ","95752"],[5,"SIT_ANIM ","14587"],[6,"LT_ANIM ","96578"],[7,"LB_ANIM ","33578"],[8,"SHIT_ANIM ","35425"]];
export interface IAssetsElement extends IElementBase{
 	/**资源ID*/
	ID:number
	/**资源名称*/
	Name:string
	/**GUID*/
	Anime:string
 } 
export class AssetsConfig extends ConfigBase<IAssetsElement>{
	constructor(){
		super(EXCELDATA);
	}

}