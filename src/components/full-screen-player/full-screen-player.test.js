import React from "react";
import renderer from "react-test-renderer";

import {FullScreenPlayer} from "./full-screen-player.jsx";

const mockState = {
  isPlaying: false,
  progress: 0,
  duration: 0,
};

const movie = {
  title: `The Grand Budapest Hotel`,
};


it(`Should FullScreenPlayer render correctly`, () => {
  const {isPlaying, progress, duration} = mockState;

  const tree = renderer
    .create(
        <FullScreenPlayer
          isPlaying={isPlaying}
          progress={progress}
          duration={duration}
          movie={movie}
          onFullScreenButtonClick={() => {}}
          onFullScreenToggle={() => {}}
          onPlayButtonClick={() => {}}
        >
          <video/>
        </FullScreenPlayer>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
