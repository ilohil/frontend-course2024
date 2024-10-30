import { useState } from "react";

function TallennaTieto() {

    const [arvosana, setArvosana] = useState({
        nimi: '',
        paiva: '',
        arvosana: ''
    });

    const [viesti, setViesti] = useState('');

    const muuta = (e) => {
        setArvosana(
            {
                ...arvosana,
                [e.target.name]: e.target.value
            }
        );
        setViesti('');
    };

    const tarkista = () => {
        for (const [key, value] of Object.entries(arvosana)) {
            if (value === '') {
                setViesti('Kaikissa kentissä pitää olla arvot.')
                return
            }

        }

        setViesti('Talletettiin')

    };

    return (
        <>
            <form>
                <label>Nimi
                    <input type='text' name='nimi' value={arvosana.nimi} onChange={(e) => muuta(e)} /><br />
                </label>
                <label>Päivä
                    <input type='text' name='paiva' value={arvosana.paiva} onChange={(e) => muuta(e)} /><br />
                </label>
                <label>Arvosana
                    <input type='text' name='arvosana' value={arvosana.arvosana} onChange={(e) => muuta(e)} /><br />
                </label>
                <input type='button' value='Lisää' onClick={() => tarkista()} />
            </form>
            <p>{viesti} </p>
        </>
    )
}

export default TallennaTieto;