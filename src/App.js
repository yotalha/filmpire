import { useState, useEffect } from "react";
import './App.css';
import MovieCard from "./MovieCard";
import SearchIcon from './search.svg';


//e5f79f57

const API_URL = 'http://www.omdbapi.com?apikey=e5f79f57';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  }

  // didnt work concurrent change as the user searches
  // const search = (e) => {
  //   searchMovies(e.target.value);
  //   setSearchTerm(e.target.value)
  // }

  useEffect(() => {
    searchMovies('batman')
  }, [])

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input 
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img 
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {
        movies?.length > 0
          ? (
            <div className="container">
        {
          movies.map((movie) => (
            <MovieCard movie={movie} />
          ))
        }
      </div>
          ):
          (
            <div className="empty">
              <h2>No movies found</h2>
            </div>
          )
      }
      
    </div>
  );
}

export default App;
