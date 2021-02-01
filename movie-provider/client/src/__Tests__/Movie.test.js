import React from "react";
import { act, render, cleanup, waitFor, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import { createMemoryHistory, createLocation } from "history";
import MoviePage from "../Pages/Movie";

const loadingText = "Just wait whilst we pop some popcorn.";
const history = createMemoryHistory();
const path = `/movie/:id`;

const match = {
  isExact: false,
  path,
  url: path.replace(":id", "1"),
  params: { id: "1" },
};

const state = {
  cid: "1234",
  fid: "5678",
};

const location = createLocation(match.url, state);

const mockMovie = {
  Title: "Star Wars",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BOTAzODEzNDAzMl5BMl5BanBnXkFtZTgwMDU1MTgzNzE@._V1_SX300.jpg",
  Director: "George Lucas",
  Rated: "PG",
  Runtime: "138min",
  Genre: "Adventure",
  Plot: "Description about the movie",
  Price: 24,
  FilmPrice: 25.5,
};

beforeEach(() => {
  axios.get = jest.fn(() => Promise.resolve({ data: mockMovie }));
});

afterEach(cleanup);

describe("Renders Movie Page", () => {
  it("Displays loading component while fetching movies", async () => {
    await act(async () => {
      const { getByText } = render(
        <MemoryRouter>
          <MoviePage location={location} />
        </MemoryRouter>
      );
      getByText(loadingText);
    });
  });

  it("displays the movie fetched from the API", async () => {
    await act(async () => {
      const { getByText } = render(
        <MemoryRouter>
          <MoviePage location={location} />
        </MemoryRouter>
      );

      const price = `$${mockMovie.Price.toFixed(2)}`;

      await waitFor(() => getByText(mockMovie.Title));
      getByText(mockMovie.Director);
      getByText(price);
      screen.debug();
    });
  });
});
