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
          isPlaying={false}
          onTitleClick={() => {}}
          onPosterClick={() => {}}
          onMouseEnter={onMouseEnter}
          onMouseLeave={() => {}}
          onStartPlaying={() => {}}
          onStopPlaying={() => {}}
        />
    );

    const smallMovieCard = movieCardComponent.find(`.small-movie-card`);

    smallMovieCard.simulate(`mouseenter`, movieInfo);

    expect(onMouseEnter.mock.calls[0][0]).toMatchObject(movieInfo);
  });

  it(`Should movie card mouse leave`, () => {
    const onMouseLeave = jest.fn();

    const movieCardComponent = shallow(
        <SmallMovieCard
          movie={movieInfo}
          isPlaying={false}
          onTitleClick={() => {}}
          onPosterClick={() => {}}
          onMouseEnter={() => {}}
          onMouseLeave={onMouseLeave}
          onStartPlaying={() => {}}
          onStopPlaying={() => {}}
        />
    );

    const smallMovieCard = movieCardComponent.find(`.small-movie-card`);

    smallMovieCard.simulate(`mouseleave`);

    expect(onMouseLeave.mock.calls.length).toBe(1);
  });
});
