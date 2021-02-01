import React from "react";
import {
  act,
  render,
  cleanup,
  waitForElementToBeRemoved,
  waitFor,
  screen,
} from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import axios from "axios";
import MoviesList from "../Pages/MoviesList";
import MoviePage from "../Pages/Movie";
import userEvent from "@testing-library/user-event";

const loadingText = "Just wait whilst we pop some popcorn.";

const mockMovies = [
  {
    Title: "Star Wars",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BOTAzODEzNDAzMl5BMl5BanBnXkFtZTgwMDU1MTgzNzE@._V1_SX300.jpg",
  },
  {
    Title: "Star Wars Episode II",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BOTAzODEzNDAzMl5BMl5BanBnXkFtZTgwMDU1MTgzNzE@._V1_SX300.jpg",
  },
];

beforeEach(() => {
  axios.get = jest.fn(() => Promise.resolve({ data: mockMovies }));
});

afterEach(cleanup);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
}));

describe(" Render App", () => {
  it("displays loading while fetching movies", async () => {
    await act(async () => {
      const { getByText } = render(
        <MemoryRouter>
          <MoviesList />
        </MemoryRouter>
      );
      getByText(loadingText);
    });
  });

  it("removes loading component after displaying Movies", async () => {
    const { getByText } = render(
      <MemoryRouter>
        <MoviesList />
      </MemoryRouter>
    );

    await waitForElementToBeRemoved(() => getByText(loadingText));
  });

  it("displays the movies fetched from API", async () => {
    await act(async () => {
      const { getByText } = render(
        <MemoryRouter>
          <MoviesList />
        </MemoryRouter>
      );

      await waitFor(() => getByText(mockMovies[0].Title));
      getByText(mockMovies[1].Title);
    });
  });

  it("Renders single movie once user clicks on card", async () => {
    await act(async () => {
      const { getByText } = render(
        <MemoryRouter>
          <Route exact path="/" component={MoviesList} />
          <Route exact path="/movie/:id/" component={MoviePage} />
        </MemoryRouter>
      );

      await waitForElementToBeRemoved(() => getByText(loadingText));

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

      axios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: mockMovie,
        })
      );

      userEvent.click(screen.getByText(mockMovies[0].Title));
      await waitFor(() =>
        expect(screen.getByText(mockMovie.Director)).toBeInTheDocument()
      );
      screen.debug();
    });
  });
});
