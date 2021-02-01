import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navbar, Header, Card, NetworkError, Loading } from "../components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleRight,
  faAngleDoubleLeft,
} from "@fortawesome/free-solid-svg-icons";

const MoviesAPI = () => {
  const [movies, setMovies] = useState(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let isMounted = false;

    if (!isMounted) {
      const getMovies = async () => {
        console.log("Getting movies");
        try {
          const { data } = await axios.get(process.env.REACT_APP_API_URL);
          console.log(data);
          if (!isMounted && data) {
            setMovies(data);
          }
        } catch (error) {
          if (error.message === "Network Error") {
            setLoadError(true);
          } else {
            console.log(error);
          }
        }
      };

      getMovies();
    }

    return () => {
      isMounted = true;
    };
  }, []);

  return [movies, loadError];
};

const scrollLeft = () => {
  const elements = document.getElementById("list").children;
  elements.item(10).scrollIntoView({ behavior: "smooth" });
};

const scrollRight = () => {
  const elements = document.getElementById("list").children;
  elements.item(0).scrollIntoView({ behavior: "smooth" });
};

const MoviesList = () => {
  const [movies, loadError] = MoviesAPI();

  return loadError ? (
    <NetworkError />
  ) : (
    <main>
      {movies ? (
        <>
          <Header />
          <div className="controls">
            <button className="btn btn--icon" onClick={scrollRight}>
              <FontAwesomeIcon icon={faAngleDoubleLeft} size="2x" />
            </button>
            <button className="btn btn--icon" onClick={scrollLeft}>
              <FontAwesomeIcon icon={faAngleDoubleRight} size="2x" />
            </button>
          </div>
          <div className="list" id="list">
            {movies.map((movie, i) => {
              return (
                <Link
                  key={i}
                  data-testid={`movie-card-${i}`}
                  to={{
                    pathname: `/movie/${i}`,
                    state: {
                      cinemaId: movie.ID,
                      filmId: movie.FilmId,
                    },
                  }}
                >
                  <Card movie={movie} />
                </Link>
              );
            })}
          </div>
        </>
      ) : (
        <Loading />
      )}
    </main>
  );
};

export default MoviesList;
