import React,{useState,useEffect} from 'react'
import './App.css';

function App() {
  
  const [trendingAnimeData,updateTrendingAnimeData] = useState([])
  const [isLoading,load] = useState(true)

  useEffect(() => (
    fetch('https://kitsu.io/api/edge/trending/anime/')
    .then(response => response.json())
      .then(D => (
        updateTrendingAnimeData(Object.values(D)[0]),
        load(false)
        )
      )
  ),[])
  
  return (
    <div className="App" id="trending_anime">
      <h1 id="trending_heading">Top Trending Anime right now.</h1>
      <div id="trending_grid">
        {
          trendingAnimeData.map((el,index) => (
            <div id="anime_info" key={index}>
              <h1>{el.attributes.slug}</h1>
              <img src={el.attributes.posterImage.medium} />
              <h2>Popularity-Rank : {el.attributes.popularityRank}</h2>
              <h2>Average-Rating : {el.attributes.averageRating}</h2>
            </div>
          ))
        }
      </div>
    </div>
  );}

export default App;
