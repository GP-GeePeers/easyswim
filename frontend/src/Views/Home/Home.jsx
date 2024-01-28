// Home.jsx or any other component

import React, { useEffect, useState } from 'react';
import classes from './Home.module.css';
import NextCompetition from '../../Components/Cards/NextCompetition/NextCompetition';
import axios from 'axios';

function Home(props) {
    const [data, setData] = useState(null);
    const url = "http://localhost:8000/api/";

    useEffect(() => {
        axios.get(url)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
            
        console.log('Success fetching data:', data);
    }, []);

    return (
        <div className={classes.topCardContainer}>
            <NextCompetition
                changeCompDetailsModal={props.changeCompDetailsModal}
            />
        </div>
    );

}

export default Home;