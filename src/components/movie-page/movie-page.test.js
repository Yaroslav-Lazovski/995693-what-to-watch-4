import React from "react";
import renderer from "react-test-renderer";
import MoviePage from "./movie-page.jsx";
import films from "../../mocks/films.js";


const movie = {
  background: `img/movie.jpg`,
  title: `The movie`,
  genre: `Drama`,
  year: 2014,
  poster: `img/movie-poster.jpg`,
  ratingScore: 8.9,
  ratingCount: 240,
  description: `Movie description`,
  director: `Movie director`,
  starring: `Movie starring`,
};


describe(`MoviePage Snapshot`, () => {
  it(`Should movie page render correctly`, () => {
    const tree = renderer
      .create(<MoviePage
        movieBackground={movie.background}
        movieTitle={movie.title}
        movieGenre={movie.genre}
        movieYear={movie.year}
        moviePoster={movie.poster}
        movieRatingScore={movie.ratingScore}
        movieRatingCount={movie.ratingCount}
        movieDescription={movie.description}
        movieDirector={movie.director}
        movieStarring={movie.starring}
        movies={films}
        onTitleClick={() => {}}
        onPosterClick={() => {}}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
