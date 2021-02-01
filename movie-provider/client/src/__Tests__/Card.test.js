import React from "react";
import { render } from "@testing-library/react";
import Card from "../components/card";

describe("Movie Card", () => {
  test("it renders the movie title and poster", () => {
    const movie = {
      Title: "Star Wars: Episode VII - The Force Awakens",
      Poster:
        "https://m.media-amazon.com/images/M/MV5BOTAzODEzNDAzMl5BMl5BanBnXkFtZTgwMDU1MTgzNzE@._V1_SX300.jpg",
    };

    const { getByText, getByAltText } = render(<Card movie={movie} />);

    const titleNode = getByText(movie.Title);
    const imgNode = getByAltText(/movie poster/i);
    expect(titleNode).toBeDefined();
    expect(imgNode).toHaveAttribute("src", movie.Poster);
  });
});
