import { useEffect, useState } from "react";

function Elokuvat() {
    const [elokuvat, setElokuvat] = useState([]);
    const [error, setError] = useState('Haetaan');

    const fetchUrl = async () => {
        try {
            const response = await fetch('https://swapi.dev/api/films/');
            const json = await response.json();
            console.log(json);
            setElokuvat(json.results);
            setError('');
        } catch (error) {
            setError('Haku ei onnistunut')
        }
    }

    useEffect(() => { fetchUrl(); }, []);

    if (elokuvat.length === 0) {
        return (<p>{error}</p>);
    }

    return (
        <>
        {
            elokuvat.map(elokuva => {
                return(
                    <p key={elokuva.episode_id} style={{color:'blue', fontWeight:'bold'}}>
                        Nimi: {elokuva.title}<br/>
                        Ohjaaja: {elokuva.director}
                    </p>
                ); // return
            }) // map

        }
        </>
    );
}
export default Elokuvat;