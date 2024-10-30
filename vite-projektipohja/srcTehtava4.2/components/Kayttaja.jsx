import { useEffect, useState } from "react";

function Kayttaja () {

    const [name, setName] = useState('');
    const [user, setUser] = useState('');
    const [city, setCity] = useState('');
    const [error, setError] = useState('Searching...');


    useEffect(() => {fetchUrl()}, []);

    const fetchUrl = async() => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users/5')
            const json = await response.json();
            console.log(json);
            setError('');
            setName(json.name);
            setUser(json.username);
            setCity(json.address.city)

        } catch (error) {
            setError('Search failed')
        }
    }

    return (
        <>
        {error}
        Nimi: {name} <br />
        Käyttäjä: {user} <br />
        Kaupunki: {city}
        </>
    )

}

export default Kayttaja;