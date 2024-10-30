function Matkalista({ lista }) {
    return (
        <div>
            {
                lista.map(matka => {
                    return (
                        <p key={matka.id}>
                            Otsikko: {matka.otsikko}<br />
                            Päivä: {matka.paiva}<br />
                            Paikka: {matka.paikka}
                        </p>
                    );
                })
            }
        </div>
    );
}
export default Matkalista;