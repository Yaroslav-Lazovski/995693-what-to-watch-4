import React from "react";
import renderer from "react-test-renderer";

import FullScreenPlayer from "./full-screen-player.jsx";

const mockState = {
  isPlaying: false,
  progress: 0,
  duration: 0,
};

const title = `The Grand Budapest Hotel`;


it(`Should FullScreenPlayer render correctly`, () => {
  const {isPlaying, progress, duration} = mockState;

  const tree = renderer
    .create(
        <FullScreenPlayer
          isPlaying={isPlaying}
          progress={progress}
          duration={duration}
          title={title}
          onFullScreenButtonClick={() => {}}
          onFullScreenToggle={() => {}}
          onPlayButtonClick={() => {}}
        >
          <video/>
        </FullScreenPlayer>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
