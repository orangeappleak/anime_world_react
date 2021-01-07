import React,{useState,useEffect} from 'react';

import AnimeSearch from './animeSearch';


export default function AnimeList(){

    const [animeData, updateAnimeData] = useState()
    const [links, updateLinks] = useState([])
    const [url, updateUrl] = useState('https://kitsu.io/api/edge/anime/?page[limit]=10&page[offset]=0')
    const [isLoading, load] = useState(true)

    useEffect(() => (
        fetch(url)
        .then(response => response.json())
            .then(D => (
                updateAnimeData(Object.entries(D)[0]),
                updateLinks(Object.entries(D)[2]),
                load(false)
            ))
    ),[url])

    return(
        <div id="anime_list">
            <h1 id="main_heading">Find anime that suite your interests</h1>
            <AnimeSearch />
            {isLoading? <h1>Wait you PIECE of shit.</h1>
            : animeData[1].map((el,index) => (
                <div key={index} id='animeData'>
                    <h1><span style={{color: 'coral'}}>{el.id }{' --> '}</span>  {el.attributes.slug.toString().toUpperCase()} </h1>
                    <div id="flexing_row">
                        {checkThumbnail(el.attributes.posterImage) ? <h2>NO IMAGE FOUND FOR THIS ANIME</h2> : 
                        <div id="cover_image">
                            <img src={el.attributes.posterImage.small}></img>
                        </div>
                        
                        }
                        <div id="flexing_col">
                            <p>Description: {el.attributes.synopsis} </p>
                            <div id="read_more_button"> <h2>READ MORE</h2></div>
                        </div>
                    </div>
                </div>
            ))
            }
            <div id="page_links">
                <div id="prev_page"><h1 onClick = {() => (load(true),updateUrl(links[1].prev))}>{'<<<<<'}</h1></div>
                <div id="start_page"><h1 onClick = {() => (load(true),updateUrl(links[1].first))}>Go back to start</h1></div>
                <div id="next_page"><h1 onClick={()=> (load(true),updateUrl(links[1].next))}>{'>>>>>'}</h1></div>
            </div>
        </div>
    )
}

function checkThumbnail(image){
    if(image != null) return false;
    else return true;
}