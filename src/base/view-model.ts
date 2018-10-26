import { Request, Response } from "./types";

export class ViewModelBuilder<T extends ViewModel, I extends ViewModelInput> {
    protected readonly model: T;
    protected readonly input: I

    constructor(input: I) {
        this.input = input;
        this.model = {} as T;
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
