import React, { createContext, useState } from "react";

export const EnrollTeamContext = createContext({
    meetId: "",
    setMeetId: () => {},
    enrollTeamvisible: false,
    setEnrollTeamModalVisible: () => {},
});

export const EnrollTeamProvider = ({ children }) => {
    const [visible, setVisible] = useState(false);
    const [meetId, setMeetId] = useState("");

    const setModalVisible = (visible) => {
        setVisible(visible);
    };

    const setTeamMeetId = (meetId) => {
        setMeetId(meetId);
    };

    return (
        <EnrollTeamContext.Provider
            value={{
                enrollTeamvisible: visible,
                setEnrollTeamModalVisible: setModalVisible,
                meetId,
                setMeetId: setTeamMeetId,
            }}
        >
            {children}
        </EnrollTeamContext.Provider>
    );
};
