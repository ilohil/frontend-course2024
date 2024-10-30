import { useState } from 'react';

function MatkalistaHaku({matkat}) {
    const [paikka, setPaikka] = useState('');
    const [haetaan, setHaetaan] = useState(false);

    const muuta = (e) => {
        setPaikka(e.target.value);
        setHaetaan(false);
    }

    const hae = () => {
        setHaetaan(true);
    }

    const haeMatkat = () => {
        // Jos Hae painiketta on painettu
        if (haetaan) {
            // Filtteröidään taulukosta paikkakunnan perusteella
            let result = matkat.filter(matka => matka.paikka === paikka);

            // Jos filterointi tuotti tulosta
            if (result.length > 0) {
                // Muuttuja, jonka sisältönä tulee olemaan haun tulos
                let haku = result.map(matka => {
                    return (
                        <p key={matka.id}>
                            Otsikko: {matka.otsikko.toUpperCase()}<br />
                            Päivä: {matka.paiva}<br />
                            Paikka: {matka.paikka}<br />
                            Sää: {matka.saa}<br />
                            Kuvaus: {matka.kuvaus}<br />
                        </p>
                    ); // return
                }) // map

                return (haku);
            } else {
                return (<p>Kyseisellä paikkakunnalla ei ole matkoja</p>);
            } // if result.length
        } // if haetaan
    }

    return (
        <div>
            <form>
                <label>Paikka
                    <input type='text' name='paikka' value={paikka}
                        onChange={(e) => muuta(e)} />&nbsp;
                </label>
                <input type='button' value='Hae' onClick={() => hae()} />
            </form>

            {haeMatkat()}
        </div>
    )
}

export default MatkalistaHaku;
