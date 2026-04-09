import { createContext } from "react";
import CounterStore from "./CounterStore";
import UIStore from "./UIStore";

interface store {
    counterStore: CounterStore
    uiStore: UIStore
}

export const store: store = {
    counterStore: new CounterStore(),
    uiStore: new UIStore()
};

export const StoreContext = createContext(store);
