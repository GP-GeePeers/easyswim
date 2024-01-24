import React from "react";
import classes from "./CompetetionDetails.module.css";
import Button from "../../Buttons/Button";
import Card from "../../Cards/Card";
import NextCompetition from "../../Cards/NextCompetition/NextCompetition";

function CompetetionDetails(props) {
    const handleCloseModal = () => {
        props.changeCompDetailsModal();
    };

    return (
        <div>
            {props.compDetailsModal && (
                <div
                    className={classes.modalOverlay}
                    onClick={handleCloseModal}
                    onDragOver={(e) => e.preventDefault()}
                    onDragEnter={(e) => e.preventDefault()}
                >
                    <div
                        className={classes.modalContent}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={classes.contentContainer}>
                            {/* <Card centered></Card> */}
                            <NextCompetition />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CompetetionDetails;
