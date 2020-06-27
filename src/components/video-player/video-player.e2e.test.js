import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import VideoPlayer from "./video-player.jsx";


Enzyme.configure({
  adapter: new Adapter(),
});


describe(`VideoPlayer e2e tests`, () => {
  it(`Does the VideoPlayer has a state to play`, () => {

    const videoPlayerComponent = mount(
        <VideoPlayer
          isPlaying={true}
          src={`https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`}
          poster={`img/fantastic-beasts-the-crimes-of-grindelwald.jpg`}
        />
    );

    expect(videoPlayerComponent.state().isPlaying).toEqual(true);
  });

  it(`Does the VideoPlayer has a state to pause`, () => {

    const videoPlayerComponent = mount(
        <VideoPlayer
          isPlaying={false}
          src={`https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`}
          poster={`img/fantastic-beasts-the-crimes-of-grindelwald.jpg`}
        />
    );

    expect(videoPlayerComponent.state().isPlaying).toEqual(false);
  });
});
