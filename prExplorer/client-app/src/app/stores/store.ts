import CommonStore from "./commonStore";
import ProductStore from "./productStore";
import { useContext, createContext } from "react";
import UserStore from "./userStore";
import ModalStore from "./modalStore";
import CategoryStore from "./categoryStore";

interface Store {
    productStore: ProductStore;
    categoryStore: CategoryStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
}

export const store: Store = {
    productStore: new ProductStore(),
    categoryStore: new CategoryStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}