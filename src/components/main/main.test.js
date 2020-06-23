import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";

import films from "../../mocks/films.js";


describe(`Main Snapshot`, () => {
  it(`Should main render correctly`, () => {
    const tree = renderer
      .create(<Main
        promoTitle={`The Grand Budapest Hotel`}
        promoGenre={`Drama`}
        promoYear={2014}
        movies={films}
        onTitleClick={() => {}}
        onPosterClick={() => {}}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
