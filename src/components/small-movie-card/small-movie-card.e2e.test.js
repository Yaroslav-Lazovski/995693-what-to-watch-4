import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import SmallMovieCard from "./small-movie-card.jsx";
import {movieInfo} from "../../mocks/movie-info.js";


Enzyme.configure({
  adapter: new Adapter(),
});


describe(`SmallMovieCard e2e tests`, () => {
  it(`Should get movie info`, () => {
    const onMouseEnter = jest.fn();

    const movieCardComponent = shallow(
        <SmallMovieCard
          movie={movieInfo}
          onTitleClick={() => {}}
          onMouseEnter={onMouseEnter}
        />
    );

    const smallMovieCard = movieCardComponent.find(`.small-movie-card`);

    smallMovieCard.simulate(`mouseenter`);
    expect(onMouseEnter.mock.calls.length).toBe(1);
  });
});
