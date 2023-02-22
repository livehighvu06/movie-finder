import useFetch from "../hook/useFetch";

const MovieInfo = ({ imdbID }) => {
  const { isLoading, apiData, isError } = useFetch(
    `https://www.omdbapi.com/?i=${imdbID}&apikey=74c7894b`
  );
  if (isLoading || !apiData) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error in fetch data...</div>;
  }

  const { Title, Year, Poster, Actors, imdbRating, Plot } = apiData;

  return (
    <div className="movie-info">
      <img src={Poster} alt={Title} />
      <p>{Title}</p>
      <span>{Year}</span>
      <span className="actors">{Actors}</span>
      <span className="rating">{imdbRating}</span>
      <span className="plot">{Plot}</span>
    </div>
  );
};

export default MovieInfo;
