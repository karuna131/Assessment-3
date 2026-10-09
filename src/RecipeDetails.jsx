import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

function RecipeDetails(){
    const {id} = useParams();
    
    async function fetchData(){
        const respone = await fetch(`https://dummyjson.com/recipes/${id}`)
        if(!respone.ok){
            throw new Error('Recipe Details Not Found')
        }
        const getData = await respone.json()
        return getData;
    }

    const {data, isPending, isError, error} = useQuery({
        queryKey : ['Recipes'],
        queryFn : fetchData
    })

    if(isPending) return <h1>....Loading</h1>
    if(isError) return <h1>{error.message}</h1>

    console.log('check Data', data)

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