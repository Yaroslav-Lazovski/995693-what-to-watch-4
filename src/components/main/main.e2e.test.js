import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main.jsx";

import films from "../../mocks/films.js";

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`Main e2e tests`, () => {
  it(`Should film title be clicked`, () => {
    const onTitleClick = jest.fn();
    const onPosterClick = jest.fn();

    const mainComponent = shallow(
        <Main
          promoTitle={`The Grand Budapest Hotel`}
          promoGenre={`Drama`}
          promoYear={2014}
          movies={films}
          onTitleClick={onTitleClick}
          onPosterClick={onPosterClick}
        />
    );


    const movieTitle = mainComponent.find(`MoviesList`).dive().find(`SmallMovieCard`).first().dive().find(`.small-movie-card__title`);
    const moviePoster = mainComponent.find(`MoviesList`).dive().find(`SmallMovieCard`).first().dive().find(`.small-movie-card`);

    movieTitle.simulate(`click`);
    moviePoster.simulate(`click`);

    expect(onTitleClick.mock.calls.length).toBe(1);
    expect(onPosterClick.mock.calls.length).toBe(1);
  });
});
