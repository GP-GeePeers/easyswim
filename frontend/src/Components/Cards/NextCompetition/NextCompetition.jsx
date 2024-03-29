import React, { useState, useEffect, useContext } from "react";
import classes from "./NextCompetition.module.css";
import Card from "../../Cards/Card";
import Button from "../../Buttons/Button";
import { CompetitionDetailsContext } from "../../../contexts/competition-details";
import { ReloadHomepageContext } from "../../../contexts/reload-pages";

function NextCompetition(props) {
    // TODO - check string sizes and add "..." if too big, just like made in src/App.jsx
    const {
        setCompetitionInfo,
        competitionDetailsVisible: visible,
        setCompetitionDetailsModalVisible: setModalVisible,
    } = useContext(CompetitionDetailsContext);
    const { setReload } = useContext(ReloadHomepageContext);

    const [flag, setFlag] = useState(false);

    const handleShowInfo = () => {
        if (!flag) setCompetitionInfo(props.nextCompetitionData);
        setModalVisible(!visible);
        setFlag(visible);
        // props.setReloadHomepage(visible);
        setReload(visible);
    };

    useEffect(() => {
        if (props.nextCompetitionData) {
            setCompetitionInfo(props.nextCompetitionData);
        }
    }, [props.nextCompetitionData]);

    return (
        <>
            <Card>
                <div className={classes.title}>Próxima competição</div>
                <div className={classes.content}>
                    {!props.nextCompetitionData ? (
                        <div className={classes.text}>
                            Não está inscrito em nenhuma competição!
                        </div>
                    ) : (
                        <>
                            <div className={classes.organizationContainer}>
                                <div className={classes.text}>
                                    {props.nextCompetitionData?.organizer}
                                </div>
                            </div>
                            <div className={classes.verticalLine} />
                            <button
                                className={classes.competitionContainer}
                                onClick={handleShowInfo}
                            >
                                <div className={classes.competitionText}>
                                    {props.nextCompetitionData?.name}
                                </div>
                            </button>
                            <div className={classes.verticalLine} />
                            <div className={classes.dateContainer}>
                                <div className={classes.text}>
                                    {props.nextCompetitionData?.date}
                                </div>
                            </div>
                            <div className={classes.verticalLineState} />
                            <div className={classes.stateContainer}>
                                <Button type={props.active} disabled></Button>
                            </div>
                        </>
                    )}
                </div>
            </Card>
        </>
    );
}

export default NextCompetition;
