import React, { createContext, useState } from "react";

export const CompetitionDetailsContext = createContext({
    competitionInfo: [],
    setCompetitionInfo: () => { },
    flag: "",
    setModalFlag: () => { },
    visible: false,
    setModalVisible: () => { },
});

export const CompetitionDetailsProvider = ({ children }) => {
    const [fileInfo, setFileInfo] = useState([]);
    const [flag, setFlag] = useState("");
    const [visible, setVisible] = useState(false);

    const setCompetitionInfo = (file) => {
        setFileInfo(file);
    };

    const setModalFlag = (flag) => {
        setFlag(flag);
    };

    const setModalVisible = (visible) => {
        setVisible(visible);
    };

    return (
        <CompetitionDetailsContext.Provider
            value={{
                fileInfo,
                setCompetitionInfo: setCompetitionInfo,
                flag,
                setModalFlag: setModalFlag,
                visible,
                setModalVisible: setModalVisible,
            }}
        >
            {children}
        </CompetitionDetailsContext.Provider>
    );
};