import React, { useState, useEffect } from "react";
import MovieInfo from "./components/MovieInfo";
import Movie from "./components/Movie";
import useFetch from "./hook/useFetch";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const { isLoading, apiData, isError } = useFetch(
    "https://www.omdbapi.com/?s=Batman&apikey=74c7894b"
  );

  console.log(apiData);

  const handleMovieClick = (imdbID) => {
    setSelectedMovie(imdbID);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const result = e.target[0].value;
    if (!result) return;
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?s=${result}&apikey=74c7894b`
      );
      const data = await res.json();
      const movie = await data?.Search.filter((el) => el.Type === "movie");
      setMovies(movie);
      setSelectedMovie(null);
    } catch (error) {
      setMovies([]);
    }
  };

  const handleMovieInfoClose = () => {
    setSelectedMovie(null);
  };

  useEffect(() => {
    console.log("APP useEffect");
    if (apiData && apiData.Search) {
      const movie = apiData.Search.filter((el) => el.Type === "movie");
      setMovies(movie);
    }
  }, [apiData]);
  console.log("APP rendered");
  return (
    <div className="App">
      <div className="inner">
        <form className="search" onSubmit={handleSearchSubmit}>
          <input type="text" placeholder="Search movie" />
          <button type="submit">Search</button>
        </form>
        {(isLoading && <p className="loading">Loading...</p>) || (
          <div className="movies">
            {isError ? (
              <div>Error in fetch data...</div>
            ) : (
              movies.map((movie) => (
                <Movie
                  key={movie.imdbID}
                  poster={movie.Poster}
                  title={movie.Title}
                  onClick={() => handleMovieClick(movie.imdbID)}
                />
              ))
            )}
          </div>
        )}
      </div>
      <div
        className={`info_container ${selectedMovie ? "" : "hidden"}`}
        onClick={handleMovieInfoClose}
      >
        {selectedMovie && <MovieInfo imdbID={selectedMovie} />}
      </div>
    </div>
  );
};

export default App;
