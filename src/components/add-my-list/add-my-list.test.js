import React from "react";
import renderer from "react-test-renderer";

import {AddMyList} from "./add-my-list.jsx";

it(`MyList component render correctly`, () => {
  const tree = renderer.create(
      <AddMyList
        id={1}
        isFavorite={true}
        authorizationStatus={`AUTH`}
        onFavoriteButtonClick={() => {}}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
