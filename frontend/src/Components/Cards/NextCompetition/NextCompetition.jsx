import React from "react";
import classes from "./NextCompetition.module.css";
import Card from "../../Cards/Card";
import Button from "../../Buttons/Button";

function NextCompetition(props) {
    // TODO - check string sizes and add "..." if too big, just like made in src/App.jsx
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
                                onClick={props.changeCompDetailsModal}
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
