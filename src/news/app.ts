import { OurnetApp } from "../ournet/app";
import { IOurnetAppData, OurnetProjectName } from "../ournet/app-data";

export class NewsOurnetApp extends OurnetApp<IOurnetAppData> {

    constructor() {
        super([], OurnetProjectName.NEWS);
    }
}
