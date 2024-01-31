import React, { createContext, useState } from "react";

export const EnrollTeamContext = createContext({
    teamInfo: [],
    setTeamInfo: () => {},
    enrollTeamvisible: false,
    setEnrollTeamModalVisible: () => {},
});

export const EnrollTeamProvider = ({ children }) => {
    const [fileInfo, setFileInfo] = useState([]);
    const [visible, setVisible] = useState(false);

    const setCompetitionInfo = (file) => {
        setFileInfo(file);
    };

    const setModalVisible = (visible) => {
        setVisible(visible);
    };

    return (
        <EnrollTeamContext.Provider
            value={{
                fileInfo,
                setTeamInfo: setCompetitionInfo,
                enrollTeamvisible: visible,
                setEnrollTeamModalVisible: setModalVisible,
            }}
        >
            {children}
        </EnrollTeamContext.Provider>
    );
};
