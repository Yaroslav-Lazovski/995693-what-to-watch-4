import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main.jsx";

import {MOVIE_TITLES} from "../../consts.js";

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`Main e2e tests`, () => {
  it(`Should film title be clicked`, () => {
    const onTitleClick = jest.fn();

    const mainComponent = shallow(
        <Main
          promoTitle={`The Grand Budapest Hotel`}
          promoGenre={`Drama`}
          promoYear={2014}
          movieTitles={MOVIE_TITLES}
          onTitleClick={onTitleClick}
        />
    );

    const movieTitles = mainComponent.find(`.small-movie-card__title`);

    movieTitles.first().simulate(`click`);

    expect(onTitleClick.mock.calls.length).toBe(1);
  });
});
