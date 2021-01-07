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
    <div className="App">
      <h1>Top Trending Anime right now.</h1>
      {
        isLoading ? <h1>Pls wait you impatient dog</h1>
        : trendingAnimeData.map((el,index) => (
          <div id="anime_info" key={index}>
            <h1> Name: {el.attributes.slug}</h1>
            <p>Synopsis: {el.attributes.synopsis}</p>
          </div>
        ))
      
      }
    </div>
  );
}

export default App;
