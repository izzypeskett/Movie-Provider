import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";
import { Navbar, Loading } from "../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons";

const MoviePage = (props) => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const { cinemaId } = props.location.state;
    const { filmId } = props.location.state;

    let mounted = true;
    getMovie(
      `${process.env.REACT_APP_API_URL}/movie?cid=${cinemaId}&fid=${filmId}`
    ).then((item) => {
      if (mounted) {
        setMovie(item);
      }
    });
    return () => (mounted = false);
  }, [props]);

  const getMovie = async (url) => {
    try {
      const res = await axios.get(url);
      if (res) {
        return res.data;
      }
    } catch (err) {
      return "error";
    }
  };

  const MovieComponent = () => {
    return (
      <div className="container">
        <Link to="/" className="btn btn--icon">
          <FontAwesomeIcon icon={faAngleDoubleLeft} size="3x" />
        </Link>
        <div className="display">
          <img
            src={movie.Poster}
            alt="Movie Poster"
            className="img display__img"
          />
          <div className="display__content">
            <h1>{movie.Title}</h1>
            <ul className="display__features">
              <li>{movie.Runtime}</li>
              <li>{movie.Rated}</li>
              <li>{movie.Genre}</li>
            </ul>
            <p>{movie.Director}</p>
            <p>{movie.Plot}</p>
            <div className="display__action">
              <div className="tag tag--purple">${movie.Price.toFixed(2)}</div>
              <p>Cinema World</p>
            </div>
            <div className="display__action">
              <div className="tag tag--pink">${movie.FilmPrice.toFixed(2)}</div>
              <p>Film World</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return <main>{movie ? <MovieComponent /> : <Loading />}</main>;
};

MoviePage.propTypes = {
  cinemaId: PropTypes.string,
  filmId: PropTypes.string,
  location: PropTypes.object,
};

export default MoviePage;
