import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import moment from 'moment';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';

import Card from '..';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Card
      key="1"
      title="test"
      content="tesssssst"
      author="Igor"
      publicationDate={1492004832000}
    />,
    div
  );
});

it('render card correctly', () => {
  const { getByTestId } = render(
    <Card
      key="1"
      title="test"
      content="tesssssst"
      author="Igor"
      publicationDate={1492004832000}
    />
  );
  expect(getByTestId('card')).toHaveTextContent('test');
  expect(getByTestId('card')).toHaveTextContent('tesssssst');
  expect(getByTestId('card')).toHaveTextContent(
    moment(1492004832000).format('MMM DD, YYYY')
  );
});

it('matches snapshot', () => {
  const tree = renderer
    .create(
      <Card
        key="1"
        title="test"
        content="tesssssst"
        author="Igor"
        publicationDate={1492004832000}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
