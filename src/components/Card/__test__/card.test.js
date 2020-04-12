import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import moment from 'moment';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';

import Card from '..';

const CONSTANTS = {
  key: 1,
  title: "Don't worry",
  content: 'Every little thing gonna be all right',
  author: 'Bob',
  timestamp: 1492004832000,
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Card
      key={CONSTANTS.key}
      title={CONSTANTS.title}
      text={CONSTANTS.content}
      author={CONSTANTS.author}
      publicationDate={CONSTANTS.timestamp}
    />,
    div
  );
});

it('render card correctly', () => {
  const { getByTestId } = render(
    <Card
      key={CONSTANTS.key}
      title={CONSTANTS.title}
      text={CONSTANTS.content}
      author={CONSTANTS.author}
      publicationDate={CONSTANTS.timestamp}
    />
  );
  expect(getByTestId('card')).toHaveTextContent(CONSTANTS.title);
  expect(getByTestId('card')).toHaveTextContent(CONSTANTS.content);
  expect(getByTestId('card')).toHaveTextContent(
    moment(CONSTANTS.timestamp).format('MMM DD, YYYY')
  );
});

it('matches snapshot', () => {
  const tree = renderer
    .create(
      <Card
        key={CONSTANTS.key}
        title={CONSTANTS.title}
        text={CONSTANTS.content}
        author={CONSTANTS.author}
        publicationDate={CONSTANTS.timestamp}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
