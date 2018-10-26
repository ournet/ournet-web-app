import { IOurnetAppData, OurnetProjectName, createOurnetAppData } from "./data";
import { IRouter } from "../base/router";
import { App } from "../base/app";

export abstract class OurnetApp<DATA extends IOurnetAppData> extends App<DATA> {
    constructor(routes: IRouter[], protected readonly project: OurnetProjectName) {
        super(routes, createOurnetAppData<DATA>(project));
    }
}
