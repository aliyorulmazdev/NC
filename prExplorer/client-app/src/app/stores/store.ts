import CommonStore from "./commonStore";
import ProductStore from "./productStore";
import { useContext, createContext } from "react";
import UserStore from "./userStore";
import ModalStore from "./modalStore";

interface Store {
    productStore: ProductStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
}

export const store: Store = {
    productStore: new ProductStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}