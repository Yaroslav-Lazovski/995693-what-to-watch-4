import React from "react";
import renderer from "react-test-renderer";

import VideoPlayer from "./video-player.jsx";

const movie = {
  poster: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
};

it(`Should video player rendered correctly`, () => {
  const {preview, poster} = movie;

  const tree = renderer.create(<VideoPlayer
    isPlaying={false}
    src={preview}
    poster={poster}
    muted={true}
  />, {
    createNodeMock: () => {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
