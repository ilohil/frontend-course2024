import { useEffect } from "react";
import { useState } from "react";

function Reseptit () {

    const [error, setError] = useState('Searching...');
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {fetchUrl()}, []);

    const fetchUrl = async () => {

        try {
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken');
            const json = await response.json();
            console.log(json);
            setError('');
            setRecipes(json.meals);

        } catch (error) {
            setError('Search failed')
        }
    }

    if (recipes.length===0) {
        return (<p>{error}</p>)
    }

    return (
        <>
        {
            recipes.map(recipe => {

                return(<p key={recipe.idMeal}>
                    {recipe.strMeal}
                </p>)
            })
        }
        
        </>
    )

}

export default Reseptit;