import React,{useState} from 'react';


export default function AnimeSearch(){

    const [searchString,updateSearchString] = useState('');

    return(
        <div id="search_component">
            <div id="anime_search">
                <input id="search_bar" autoCapitalize placeholder="Dont remember an anime?  then WTF is this search bar for, just type something close to what you remember"></input>
                <h1 onClick = {() => updateSearchString(document.getElementById('search_bar').value)}>SEARCH</h1>
            </div>
            <h1>{searchString}</h1>
        </div>
    )
}