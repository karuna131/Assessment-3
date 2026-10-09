import { useEffect, useState } from "react";
import { useParams } from "react-router";

function RecipeDetails(){
    const [data, setData] = useState();
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null)
    const {id} = useParams();
    
    useEffect(()=>{
        async function fetchData(){
           try {
                const respone = await fetch(`https://dummyjson.com/recipes/${id}`)
                if(!respone.ok){
                    throw new Error('Recipe Details Not Found')
                }
                const getData = await respone.json()
                setData(getData)
           } catch (error) {
                setError(error.message)
           }finally{
                setLoading(false);
           }
        }
        fetchData();
    }, [])

    if(isLoading) return <h1>....Loading</h1>
    if(error) return <h1>{error.message}</h1>

    return (
        <>
            <div key={data.id}>
                <h1>{data.name}</h1>
                <h2>Ingredients</h2>
                {data.ingredients.map((ele, index)=>(
                    <ul key={index}>
                        <li>{ele}</li>
                    </ul>
                ))}
                <h2>Instructions</h2>
                {data.instructions.map((ele, index)=>(
                    <ul key={index}>
                        <li>{ele}</li>
                    </ul>
                ))}
            </div>
        </>
    )
}

export default RecipeDetails;