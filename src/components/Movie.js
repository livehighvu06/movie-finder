const Movie = ({ poster, title, onClick }) => {
  return (
    <div className="movie" title={title} onClick={onClick}>
      <img src={poster} alt={title} />
    </div>
  );
};
export default Movie;
