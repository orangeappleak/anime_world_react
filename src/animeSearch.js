import React from 'react';


export default function AnimeSearch({ update, load ,home,loadString}){

    return(
        <div id="search_component">
            <div id="anime_search">
                <input id="search_bar" required minLength = "2" placeholder="Dont remember an anime?  then WTF is this search bar for, just type something close to what you remember"></input>
                <h1 onClick = {() => { 
                    if(isEmpty()){
                        load(true)
                        loadString("You wanna search something empty, go somewhere else ASSHOLE")
                    }  
                    else{
                        load(true)
                        update(document.getElementById('search_bar').value)
                    }
                }}>SEARCH</h1>
                <h1 onClick = {() => {
                    if(isEmpty()){
                        load(true)
                        loadString("Alright, Alright taking you back, just hold your horses DUMBASS")
                        setTimeout(() => {home();load(false)},2000)
                    }
                    else{
                        home();
                        load(true);
                        document.getElementById('search_bar').value = ''
                    }
                }}>HOME</h1>
            </div>
        </div>
    );
}

const isEmpty = () => {
    if (document.getElementById('search_bar').value === '') return true 
    else return false

}