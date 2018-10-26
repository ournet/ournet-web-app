import { IOurnetAppData, OurnetProjectName, createOurnetAppData } from "./app-data";
import { IRoute } from "../base/route";
import { App } from "../base/app";

export abstract class OurnetApp<DATA extends IOurnetAppData> extends App<DATA> {

    constructor(routes: IRoute[], protected readonly project: OurnetProjectName) {
        super(routes);
    }

    protected createData() {
        return createOurnetAppData<DATA>(this.project);
    }
}
