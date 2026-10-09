import {useQuery} from '@tanstack/react-query'
import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router';

async function fetchData(){
    const response = await fetch('https://dummyjson.com/recipes');
    if(!response.ok){
        throw new Error('Data Not Found')
    }
    return response.json();
}


function Home(){
    const [searchData, setSearchData] = useState('');

    let inputRef = useRef(null);
    
    // useEffect(()=>{
    //     inputRef.current.focus();
    // }, [])
    
    const {data, isPending, isError, error} = useQuery({
        queryKey : ['Recipes'],
        queryFn : fetchData
    })

    useEffect(() => {
        if (!isPending && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isPending]);
    
    if(isPending) return <h1>....Loading</h1>
    if(isError) return <h1>{error.message}</h1>

    const filterData = data.recipes.filter((values) => {
        return values.name.toLowerCase().includes(searchData.toLowerCase());
    });

    return (
        <>
        <input ref={inputRef} type='text' placeholder='Search' value={searchData} onChange={(e => setSearchData(e.target.value))} style={{marginBottom : '10px'}}/>

        <div className="list_data">
            {filterData.map((ele) => (
                <Link key={ele.id} to={`/recipes/${ele.id}`}>{ele.name}</Link>
            ))}
        </div>
        </>
    )
}

export default Home;