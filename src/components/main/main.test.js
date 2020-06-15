import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";


const MOVIE_TITLES = [
  `Fantastic Beasts: The Crimes of Grindelwald`,
  `Bohemian Rhapsody`,
  `Macbeth`,
  `Aviator`,
  `We need to talk about Kevin`,
  `What We Do in the Shadows`,
  `Revenant`,
  `Johnny English`,
  `Shutter Island`,
  `Pulp Fiction`,
  `No Country for Old Men`,
  `Snatch`, `Moonrise Kingdom`,
  `Seven Years in Tibet`,
  `Midnight Special`, `War of the Worlds`,
  `Dardjeeling Limited`,
  `Orlando`,
  `Mindhunter`,
  `Midnight Special`
];

describe(`Main Component`, () => {
  it(`Should main render correctly`, () => {
    const tree = renderer
      .create(<Main
        promoTitle={`The Grand Budapest Hotel`}
        promoGenre={`Drama`}
        promoYear={2014}
        movieTitles={MOVIE_TITLES}
        onTitleClick={() => {}}
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
