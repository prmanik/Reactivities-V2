import { makeAutoObservable } from "mobx"

export default class UIStore {
    isLoading = false

    constructor() {
        makeAutoObservable(this);
    }

    isbusy = () => {
        this.isLoading = true;
    }

    isIdle = () => {
        this.isLoading = false;
    }
}