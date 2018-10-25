import { Request, Response } from "./types";

export class ViewModelBuilder<T extends ViewModel, I extends ViewModelInput> {
    protected readonly model: T;

    constructor(protected readonly input: I) {
        this.model = this.initModel();
    }

    protected initModel() {
        return {} as T;
    }

    build(): T | Promise<T> {
        return this.model;
    }
}

export interface ViewModelInput {
    readonly req: Request
    readonly res: Response
}

export interface ViewModel {

}
