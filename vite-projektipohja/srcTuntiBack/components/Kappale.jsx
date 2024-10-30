import { useEffect, useState } from "react";

function Kappale() {
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [error, setError] = useState('Haetaan');

    const fetchUrl = async () => {
        try {
            const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Ffeeds.publicradio.org%2Fpublic_feeds%2Fsong-of-the-day%2Frss%2Frss');
            const json = await response.json();
            console.log(json);
            setTitle(json.items[0].title);
            setLink(json.items[0].enclosure.link);
            setError('');
        } catch (error) {
            setError('Haku ei onnistunut')
        }
    }

    useEffect(() => { fetchUrl(); }, []);

    if (error.length === 0) {
        return (<p>{error}</p>)
    }
    
    return (
        <>
            {title}<br />
            <audio controls autoplay>
                <source src={link} type='audio/mpeg' />
            </audio>
        </>
    )
}
export default Kappale;