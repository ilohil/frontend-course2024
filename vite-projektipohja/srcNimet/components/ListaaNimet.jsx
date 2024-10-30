function ListaaNimet({nimet}) {
    return (
        <div>
            {
                nimet.map(nimi => {
                    return (
                        <p key={nimi.nimi}>
                            Nimi: {nimi.nimi}<br />
                            Alkaa: {nimi.alkupaiva}<br />
                            Päättyy: {nimi.loppupaiva}
                        </p>
                    );
                })
            }
        </div>
    );

}

export default ListaaNimet;