import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AnimeList from './animeList'
import Footer from './footer'

ReactDOM.render(
  <div>
    <App />
    <AnimeList/>
    <Footer />
  </div>,
  document.getElementById('root')
);
