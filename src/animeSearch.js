import React from 'react';


export default function AnimeSearch({ update, load ,home}){

    return(
        <div id="search_component">
            <div id="anime_search">
                <input id="search_bar" placeholder="Dont remember an anime?  then WTF is this search bar for, just type something close to what you remember"></input>
                <h1 onClick = {() => {update(document.getElementById('search_bar').value);load(true)}}>SEARCH</h1>
                <h1 onClick = {() => {home();load(true);document.getElementById('search_bar').value = ''}}>CLEAR</h1>
            </div>
        </div>
    );
}