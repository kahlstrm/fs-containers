import { render } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { Todo } from '../Todos/List';

const todo = {
  text: 'go buy groceries',
  done: false,
};
const complete ={
  text: 'go buy pizza',
  done: true,
};

describe('<Todo/>', () => {
  it('should render not done properly', () => {
    const onClickDelete = jest.fn();
    const onClickComplete = jest.fn();

    const { getByText } = render(
      <Todo
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
        todo={todo}
      />
    );
    expect(getByText('go buy groceries')).toBeVisible();
    expect(getByText('This todo is not done')).toBeVisible();
  });
  it('should render done properly', () => {
    const onClickDelete = jest.fn();
    const onClickComplete = jest.fn();

    const { getByText } = render(
      <Todo
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
        todo={complete}
      />
    );
    expect(getByText('go buy pizza')).toBeVisible();
    expect(getByText('This todo is done')).toBeVisible();
  });
});
