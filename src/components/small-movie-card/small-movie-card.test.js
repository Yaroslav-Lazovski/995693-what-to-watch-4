import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";

import history from "../../history";
import SmallMovieCard from "./small-movie-card.jsx";

import {movieInfo} from "../../mocks/movie-info.js";


describe(`SmallMovieCard Snapshot`, () => {
  it(`Should small movie card render correctly`, () => {
    const tree = renderer
      .create(
          <Router
            history={history}
          >
            <SmallMovieCard
              movie={movieInfo}
              isPlaying={false}
              onMouseEnter={() => {}}
              onMouseLeave={() => {}}
              onStartPlaying={() => {}}
              onStopPlaying={() => {}}
            />
          </Router>, {
            createNodeMock: () => {
              return {};
            }
          }).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
