import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
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

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`Main e2e tests`, () => {
  it(`Should film title be clicked`, () => {
    const titleClickHandler = jest.fn();

    const mainComponent = shallow(
        <Main
          promoTitle={`The Grand Budapest Hotel`}
          promoGenre={`Drama`}
          promoYear={2014}
          movieTitles={MOVIE_TITLES}
          onTitleClick={titleClickHandler} />
    );

    const movieTitles = mainComponent.find(`.small-movie-card__title`);

    movieTitles.forEach((movieTitle) => movieTitle.simulate(`click`));

    expect(titleClickHandler.mock.calls.length).toBe(MOVIE_TITLES.length);
  });
});
