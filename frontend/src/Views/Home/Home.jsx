// Home.jsx or any other component

import React, { useEffect, useState } from 'react';
import classes from './Home.module.css';
import NextCompetition from '../../Components/Cards/NextCompetition/NextCompetition';
import axios from 'axios';

function Home(props) {
    const [data, setData] = useState(null);
    const url = "http://localhost:8000/api/";

    let container = classes.container;

    if (props.retracted === true) {
        container += ` ${classes.containerRetracted}`;
    }
    
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
        <div className={container}>
            <div className={classes.contentContainer}>
                <h1>Homepage</h1>
                <h1>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Maxime mollitia, molestiae quas vel sint commodi repudiandae
                    consequuntur voluptatum laborum numquam blanditiis harum
                    quisquam eius sed odit fugiat iusto fuga praesentium optio,
                    eaque rerum! Provident similique accusantium nemo autem.
                    Veritatis obcaecati tenetur iure eius earum ut molestias
                    architecto voluptate aliquam nihil, eveniet aliquid culpa
                    officia aut! Impedit sit sunt quaerat, odit, tenetur error,
                    harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
                    quia. Quo neque error repudiandae fuga? Ipsa laudantium
                    molestias eos sapiente officiis modi at sunt excepturi
                    expedita sint? Sed quibusdam recusandae alias error harum
                    maxime adipisci amet laborum. Perspiciatis minima nesciunt
                    dolorem! Officiis iure rerum voluptates a cumque velit
                    quibusdam sed amet tempora. Sit laborum ab, eius fugit
                    doloribus tenetur fugiat, temporibus enim commodi iusto
                    libero magni deleniti quod quam consequuntur! Commodi minima
                    excepturi repudiandae velit hic maxime doloremque. Quaerat
                    provident commodi consectetur veniam similique ad earum
                    omnis ipsum saepe, voluptas, hic voluptates pariatur est
                    explicabo fugiat, dolorum eligendi quam cupiditate excepturi
                    mollitia maiores labore suscipit quas? Nulla, placeat.
                    Voluptatem quaerat non architecto ab laudantium modi minima
                    sunt esse temporibus sint culpa, recusandae aliquam numquam
                    totam ratione voluptas quod exercitationem fuga. Possimus
                    quis earum veniam quasi aliquam eligendi, placeat qui
                    corporis!
                </h1>
                <h1>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Maxime mollitia, molestiae quas vel sint commodi repudiandae
                    consequuntur voluptatum laborum numquam blanditiis harum
                    quisquam eius sed odit fugiat iusto fuga praesentium optio,
                    eaque rerum! Provident similique accusantium nemo autem.
                    Veritatis obcaecati tenetur iure eius earum ut molestias
                    architecto voluptate aliquam nihil, eveniet aliquid culpa
                    officia aut! Impedit sit sunt quaerat, odit, tenetur error,
                    harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
                    quia. Quo neque error repudiandae fuga? Ipsa laudantium
                    molestias eos sapiente officiis modi at sunt excepturi
                    expedita sint? Sed quibusdam recusandae alias error harum
                    maxime adipisci amet laborum. Perspiciatis minima nesciunt
                    dolorem! Officiis iure rerum voluptates a cumque velit
                    quibusdam sed amet tempora. Sit laborum ab, eius fugit
                    doloribus tenetur fugiat, temporibus enim commodi iusto
                    libero magni deleniti quod quam consequuntur! Commodi minima
                    excepturi repudiandae velit hic maxime doloremque. Quaerat
                    provident commodi consectetur veniam similique ad earum
                    omnis ipsum saepe, voluptas, hic voluptates pariatur est
                    explicabo fugiat, dolorum eligendi quam cupiditate excepturi
                    mollitia maiores labore suscipit quas? Nulla, placeat.
                    Voluptatem quaerat non architecto ab laudantium modi minima
                    sunt esse temporibus sint culpa, recusandae aliquam numquam
                    totam ratione voluptas quod exercitationem fuga. Possimus
                    quis earum veniam quasi aliquam eligendi, placeat qui
                    corporis!
                </h1>
                <h1>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Maxime mollitia, molestiae quas vel sint commodi repudiandae
                    consequuntur voluptatum laborum numquam blanditiis harum
                    quisquam eius sed odit fugiat iusto fuga praesentium optio,
                    eaque rerum! Provident similique accusantium nemo autem.
                    Veritatis obcaecati tenetur iure eius earum ut molestias
                    architecto voluptate aliquam nihil, eveniet aliquid culpa
                    officia aut! Impedit sit sunt quaerat, odit, tenetur error,
                    harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
                    quia. Quo neque error repudiandae fuga? Ipsa laudantium
                    molestias eos sapiente officiis modi at sunt excepturi
                    expedita sint? Sed quibusdam recusandae alias error harum
                    maxime adipisci amet laborum. Perspiciatis minima nesciunt
                    dolorem! Officiis iure rerum voluptates a cumque velit
                    quibusdam sed amet tempora. Sit laborum ab, eius fugit
                    doloribus tenetur fugiat, temporibus enim commodi iusto
                    libero magni deleniti quod quam consequuntur! Commodi minima
                    excepturi repudiandae velit hic maxime doloremque. Quaerat
                    provident commodi consectetur veniam similique ad earum
                    omnis ipsum saepe, voluptas, hic voluptates pariatur est
                    explicabo fugiat, dolorum eligendi quam cupiditate excepturi
                    mollitia maiores labore suscipit quas? Nulla, placeat.
                    Voluptatem quaerat non architecto ab laudantium modi minima
                    sunt esse temporibus sint culpa, recusandae aliquam numquam
                    totam ratione voluptas quod exercitationem fuga. Possimus
                    quis earum veniam quasi aliquam eligendi, placeat qui
                    corporis!
                </h1>
                <h1>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Maxime mollitia, molestiae quas vel sint commodi repudiandae
                    consequuntur voluptatum laborum numquam blanditiis harum
                    quisquam eius sed odit fugiat iusto fuga praesentium optio,
                    eaque rerum! Provident similique accusantium nemo autem.
                    Veritatis obcaecati tenetur iure eius earum ut molestias
                    architecto voluptate aliquam nihil, eveniet aliquid culpa
                    officia aut! Impedit sit sunt quaerat, odit, tenetur error,
                    harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
                    quia. Quo neque error repudiandae fuga? Ipsa laudantium
                    molestias eos sapiente officiis modi at sunt excepturi
                    expedita sint? Sed quibusdam recusandae alias error harum
                    maxime adipisci amet laborum. Perspiciatis minima nesciunt
                    dolorem! Officiis iure rerum voluptates a cumque velit
                    quibusdam sed amet tempora. Sit laborum ab, eius fugit
                    doloribus tenetur fugiat, temporibus enim commodi iusto
                    libero magni deleniti quod quam consequuntur! Commodi minima
                    excepturi repudiandae velit hic maxime doloremque. Quaerat
                    provident commodi consectetur veniam similique ad earum
                    omnis ipsum saepe, voluptas, hic voluptates pariatur est
                    explicabo fugiat, dolorum eligendi quam cupiditate excepturi
                    mollitia maiores labore suscipit quas? Nulla, placeat.
                    Voluptatem quaerat non architecto ab laudantium modi minima
                    sunt esse temporibus sint culpa, recusandae aliquam numquam
                    totam ratione voluptas quod exercitationem fuga. Possimus
                    quis earum veniam quasi aliquam eligendi, placeat qui
                    corporis!
                </h1>
                <h1>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Maxime mollitia, molestiae quas vel sint commodi repudiandae
                    consequuntur voluptatum laborum numquam blanditiis harum
                    quisquam eius sed odit fugiat iusto fuga praesentium optio,
                    eaque rerum! Provident similique accusantium nemo autem.
                    Veritatis obcaecati tenetur iure eius earum ut molestias
                    architecto voluptate aliquam nihil, eveniet aliquid culpa
                    officia aut! Impedit sit sunt quaerat, odit, tenetur error,
                    harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
                    quia. Quo neque error repudiandae fuga? Ipsa laudantium
                    molestias eos sapiente officiis modi at sunt excepturi
                    expedita sint? Sed quibusdam recusandae alias error harum
                    maxime adipisci amet laborum. Perspiciatis minima nesciunt
                    dolorem! Officiis iure rerum voluptates a cumque velit
                    quibusdam sed amet tempora. Sit laborum ab, eius fugit
                    doloribus tenetur fugiat, temporibus enim commodi iusto
                    libero magni deleniti quod quam consequuntur! Commodi minima
                    excepturi repudiandae velit hic maxime doloremque. Quaerat
                    provident commodi consectetur veniam similique ad earum
                    omnis ipsum saepe, voluptas, hic voluptates pariatur est
                    explicabo fugiat, dolorum eligendi quam cupiditate excepturi
                    mollitia maiores labore suscipit quas? Nulla, placeat.
                    Voluptatem quaerat non architecto ab laudantium modi minima
                    sunt esse temporibus sint culpa, recusandae aliquam numquam
                    totam ratione voluptas quod exercitationem fuga. Possimus
                    quis earum veniam quasi aliquam eligendi, placeat qui
                    corporis!
                </h1>
                <h1>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Maxime mollitia, molestiae quas vel sint commodi repudiandae
                    consequuntur voluptatum laborum numquam blanditiis harum
                    quisquam eius sed odit fugiat iusto fuga praesentium optio,
                    eaque rerum! Provident similique accusantium nemo autem.
                    Veritatis obcaecati tenetur iure eius earum ut molestias
                    architecto voluptate aliquam nihil, eveniet aliquid culpa
                    officia aut! Impedit sit sunt quaerat, odit, tenetur error,
                    harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
                    quia. Quo neque error repudiandae fuga? Ipsa laudantium
                    molestias eos sapiente officiis modi at sunt excepturi
                    expedita sint? Sed quibusdam recusandae alias error harum
                    maxime adipisci amet laborum. Perspiciatis minima nesciunt
                    dolorem! Officiis iure rerum voluptates a cumque velit
                    quibusdam sed amet tempora. Sit laborum ab, eius fugit
                    doloribus tenetur fugiat, temporibus enim commodi iusto
                    libero magni deleniti quod quam consequuntur! Commodi minima
                    excepturi repudiandae velit hic maxime doloremque. Quaerat
                    provident commodi consectetur veniam similique ad earum
                    omnis ipsum saepe, voluptas, hic voluptates pariatur est
                    explicabo fugiat, dolorum eligendi quam cupiditate excepturi
                    mollitia maiores labore suscipit quas? Nulla, placeat.
                    Voluptatem quaerat non architecto ab laudantium modi minima
                    sunt esse temporibus sint culpa, recusandae aliquam numquam
                    totam ratione voluptas quod exercitationem fuga. Possimus
                    quis earum veniam quasi aliquam eligendi, placeat qui
                    corporis!
                </h1>
            </div>
        </div>
    );

}

export default Home;