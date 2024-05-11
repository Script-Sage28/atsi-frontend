import useStore from './store';
const selector = (key:string) => (state: any) => state[key];
const storeProvider = useStore.getState();


export const {
    login,
    saveUserInfo,
    logout,
    loadProducts,
    reviewProducts,
    loadBrandCategory,
    Abouts,
    LinkUs
} = storeProvider;

export { selector, storeProvider }