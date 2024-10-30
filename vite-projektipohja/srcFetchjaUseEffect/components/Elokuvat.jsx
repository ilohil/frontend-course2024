import { useState } from "react";
import { useEffect } from "react";

function Elokuvat () {

    const [error, SetError] = useState('Haetaan');
    const [elokuvat, setElokuvat] = useState([]);

    const fetchUrl = async () => {
        try {
            const response = await fetch('https://swapi.dev/api/films/');
            const json = await response.json();
            console.log(json);
            setElokuvat(json.results);
            SetError('');
        } catch (error) {
            SetError('Haku ei onnistunut');
        }

    }

    useEffect(() => {fetchUrl()}, []);

    if (elokuvat.length===0) {
        return (<p>{error}</p>)
    }

    return (
        <>
        {
            elokuvat.map(elokuva => {

                return(<p key={elokuva.episode_id} style={{color:'blue', fontWeight:'bold'}}>
                    Nimi: {elokuva.title}<br />
                    Ohjaaja: {elokuva.director} <br />
                    </p>); //return

            }) //map


        }
        </>
    )
}

export default Elokuvat;
