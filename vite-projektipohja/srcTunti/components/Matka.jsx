function Matka({ matka, paiva }) {
    return (
        <>
            <p>
                Otsikko: {matka.otsikko}<br />
                Päivä: {matka.paiva}<br />
                Paikka: {matka.paikka} <br />
                Sää: {matka.saa}<br />
                Kuvaus: {matka.kuvaus}
            </p>
            <p>Tehty {paiva}</p>
        </>
    );
}

export default Matka;