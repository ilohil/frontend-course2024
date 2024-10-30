function Ajot({ajot, nimi}) {
    return (
    <>
    <p>
    Nimi: {ajot.laatija}<br />
    Rekisterinumero: {ajot.rekisterinro}<br />
    Matka: {ajot.loppu.lukema - ajot.alku.lukema} kilometriä
    </p>
    <p>
    Tekijä: {nimi}
    </p>
    </>
    )

}

export default Ajot