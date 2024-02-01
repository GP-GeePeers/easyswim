import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import reportWebVitals from "./reportWebVitals";
import { CompetitionDetailsProvider } from "./contexts/competition-details";
import { EnrollTeamProvider } from "./contexts/enroll-team";
import { ReloadHomepageProvider } from "./contexts/reload-pages";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <CompetitionDetailsProvider>
            <EnrollTeamProvider>
                <ReloadHomepageProvider>
                    <React.StrictMode>
                        <App />
                    </React.StrictMode>
                </ReloadHomepageProvider>
            </EnrollTeamProvider>
        </CompetitionDetailsProvider>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
