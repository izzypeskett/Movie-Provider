import React from "react";
import PropTypes from "prop-types";

const MovieCard = (props) => {
  const { movie } = props;
  return (
    <div className="card">
      <img src={movie.Poster} alt="Movie Poster" className="img card__img" />
      <div className="card__title">
        <p>{movie.Title}</p>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.object,
  key: PropTypes.number,
};

export default MovieCard;
