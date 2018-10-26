import { OurnetApp } from "../ournet/app";
import { IOurnetAppData, OurnetProjectName } from "../ournet/data";
import { IndexRouter } from "./routes/index-router";

export class NewsOurnetApp extends OurnetApp<IOurnetAppData> {

    constructor() {
        super([new IndexRouter()], OurnetProjectName.NEWS);
    }
}
