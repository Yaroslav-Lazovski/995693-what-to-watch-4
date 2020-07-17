import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import {FullScreenPlayer} from "./full-screen-player";

configure({
  adapter: new Adapter(),
});

const mockState = {
  isPlaying: false,
  progress: 0,
  duration: 0,
};

const movie = {
  title: `The Grand Budapest Hotel`,
};

it(`On Play button click calls callback`, () => {
  const {isPlaying, progress, duration} = mockState;

  const handlePlayButtonClick = jest.fn();

  const wrapper = shallow(
      <FullScreenPlayer
        isPlaying={isPlaying}
        progress={progress}
        duration={duration}
        movie={movie}
        onFullScreenButtonClick={() => {}}
        onFullScreenToggle={() => {}}
        onPlayButtonClick={handlePlayButtonClick}>
        <video />
      </FullScreenPlayer>
  );

  wrapper.find(`.player__play`).simulate(`click`);
  expect(handlePlayButtonClick).toHaveBeenCalledTimes(1);
});
