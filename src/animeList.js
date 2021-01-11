import React,{useState,useEffect} from 'react';
import Categories from './categories'
import AnimeSearch from './animeSearch';
import {useTrail,a} from 'react-spring';


export default function AnimeList(){

    const [animeData, updateAnimeData] = useState()
    const [links, updateLinks] = useState([])
    const [url, updateUrl] = useState('https://kitsu.io/api/edge/anime?sort=slug&page[limit]=10')
    const [isLoading, load] = useState(true)
    const [loadString, updateLoadString] = useState('Wait you peice of shit')


    const check_next_link = () => {

        try{
            if(('next' in links[1])) return true
            else return false
        }
        catch(err){console.log("shit is undefined")}
    }
    
    const check_prev_link = () => {
        try{
            if(('prev' in links[1])) return true
            else return false
        }
        catch(err){console.log("shit is undefined")}
    }

    useEffect(() => 
        fetch(url)
        .then(response => response.json())
            .then(D => {
                updateAnimeData(Object.entries(D)[0]);
                updateLinks(Object.entries(D)[2]);
                load(false);
                }
                ),[url])


    return(
        <div id="anime_list">
            <h1 id="main_heading">Find anime that suite your interests</h1>
            <AnimeSearch 
                home={() => updateUrl('https://kitsu.io/api/edge/anime?sort=slug&page[limit]=10')}
                load = {searching => ((load(searching),updateLoadString('Cant you be patient for a while, idiot wait let me search!')))} 
                loadString = {(str) => (updateLoadString(str))}
                update = {search_url => (
                    updateUrl(`https://kitsu.io/api/edge/anime?filter[text]=${search_url.replaceAll(" ","%20")}`
                ))}
            />
            <Categories />
            {isLoading? <Loader loadString = {loadString}/>
            : animeData[1].map((el,index) => (
                <div key={index} id='animeData'>
                    <h1> {el.attributes.slug.toString().toUpperCase()} </h1>
                    <div id="flexing_row">
                        <div id="overlay_sheet"></div>
                        {checkDataNull(el.attributes.posterImage) ? <h2>NO IMAGE FOUND FOR THIS ANIME</h2> : 
                        <div id="cover_image">
                            <img alt="" src={el.attributes.posterImage.small}></img>
                        </div>
                        }
                        <div id="anime_ratings">
                            <h1>Ratings & Reviews</h1>
                            <div id="reviewsAratings">
                                <p><span style={{opacity: 1,color: 'white'}}>Age Rating: </span> {el.attributes.ageRating}</p>
                                {checkDataNull(el.attributes.ageRatingGuide) ? <p><span style={{opacity: 1,color: 'white'}}>Age Rating Guide: </span>NULL</p> : <p><span style={{opacity: 1,color: 'white'}}>Age Rating Guide: </span>{el.attributes.ageRatingGuide}</p>}
                                {checkDataNull(el.attributes.averageRating) ? <p><span style={{opacity: 1,color: 'white'}}>Average Rating: </span>NULL</p> : <p><span style={{opacity: 1,color: 'white'}}>Average Rating: </span> {el.attributes.averageRating}</p>}
                                <p><span style={{opacity: 1,color: 'white'}}>Popularity Rank: </span>{el.attributes.popularityRank}</p>
                                {checkDataNull(el.attributes.ratingRank) ? <p><span style={{opacity: 1,color: 'white'}}>Rating Rank: </span> NULL</p> : <p><span style={{opacity: 1,color: 'white'}}>Rating Rank: </span> {el.attributes.ratingRank}</p>}
                            </div>
                        </div>
                        <div id="flexing_col">
                            <p><span style={{color: 'white',fontWeight: 'bold',opacity: 1}}>Description:</span> {checkDataNull(el.attributes.synopsis) ? 'No Description to show' : el.attributes.synopsis }</p>
                            <div id="read_more_button" onClick = {(el) => handleReadMoreClick(el)}> <h2>READ MORE</h2></div>
                        </div>

                        
                    </div>
                </div>
            ))
            }
            <div id="page_links">
                <div id="prev_page">{
                    check_prev_link() ? <h1 onClick ={() => {load(true);updateUrl(links[1].next)}}>PREV</h1> : <h1 style={{pointerEvents: 'none'}}>.</h1>
                }
                </div>
                <div id="start_page"><h1 onClick = {() => {load(true);updateUrl(links[1].first)}}>Go back to start</h1></div>
                <div id="next_page">{
                    check_next_link() ? <h1 onClick ={() => {load(true);updateUrl(links[1].next)}}>NEXT</h1> : <h1 style={{pointerEvents: 'none'}}>.</h1>
                }
                </div>
            </div>
        </div> 
    )
}

function Trail({children}){
    const [resetOrbit, setResetOrbit] = useState(false);
    let items = React.Children.toArray(children)
    const trail = useTrail(items.length,{
        opacity: 1,
        x: 0,
        from: {opacity: 0,x: 100},
        onRest: () => setResetOrbit(state => !state),
        reset: resetOrbit
    })

    return(
            <div id="loader_dots">
                {
                    trail.map(({opacity,x},index) => (
                        <a.h1 key={index} className="dots" style={{opacity: opacity.interpolate((o) => `${o}`),transform: x.interpolate((x) => `translate(0,${x}%)`)}}>{items[index]}</a.h1>
                    ))
                }
            </div>

    )
}

function Loader({loadString}){
    return(
        <div id="loader">
            <h1 id="loadString">{loadString}</h1>
            <Trail>
               <span></span>
               <span></span>
               <span></span>
            </Trail>
        </div>

    )
}


function checkDataNull(data){
    if(data === null) return true
    if(data!=='' || data !== "") return false;
    else return true;
}

function handleReadMoreClick(element){
    element.nativeEvent.path[2].childNodes[0].classList.toggle('open_overlay');
}
