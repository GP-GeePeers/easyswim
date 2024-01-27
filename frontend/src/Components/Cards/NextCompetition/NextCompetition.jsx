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
                    <div className={classes.organizationContainer}>
                        <div className={classes.text}>
                            Associação Académica de Coimbra
                        </div>
                    </div>
                    <div className={classes.lineOrganization} />
                    <button
                        className={classes.competitionContainer}
                        onClick={props.changeCompDetailsModal}
                    >
                        <div className={classes.competitionText}>
                            <div className={classes.competitionTextContainer}>
                                Campeonato Interdistrital de Juvenis, Juniores e
                                Seniores PL
                            </div>
                        </div>
                    </button>
                    <div className={classes.line} />
                    <div className={classes.dateContainer}>
                        <div className={classes.text}>17/02/2024</div>
                    </div>
                    <div className={classes.line} />
                    <div className={classes.stateContainer}>
                        <Button type={props.active} disabled></Button>
                    </div>
                </div>
            </Card>
        </>
    );
}

export default NextCompetition;