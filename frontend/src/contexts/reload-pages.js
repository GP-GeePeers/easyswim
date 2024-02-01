import React, { createContext, useRef } from "react";

export const ReloadHomepageContext = createContext({
    reload: false,
    setReload: () => {},
});

export const ReloadHomepageProvider = ({ children }) => {
    const reloadScreen = useRef(false);

    const setReload = (bool) => {
        reloadScreen.current = bool;
    };
    // TODO - fazer reloads em tudo o que é necessário usando esta lógica que aqui está
    return (
        <ReloadHomepageContext.Provider
            value={{
                reload: reloadScreen,
                setReload: setReload,
            }}
        >
            {children}
        </ReloadHomepageContext.Provider>
    );
};
