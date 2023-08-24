import CommonStore from "./commonStore";
import ProductStore from "./productStore";
import { useContext, createContext } from "react";

interface Store {
    productStore: ProductStore;
    commonStore: CommonStore;
}

export const store: Store = {
    productStore: new ProductStore(),
    commonStore: new CommonStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}