import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setInputValue } from '../../store/reducer/inputValue';
import { addToDo } from '../../store/reducer/todo';

export default function ToDoAddForm() {
  const { inputValue } = useSelector((store) => {
    return store;
  });

  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { value } = event.target;
    dispatch(setInputValue(value));
  };

  const handleToDoAdd = (event) => {
    event.preventDefault();
    if (inputValue !== '') {
      dispatch(addToDo(inputValue));
    }
    dispatch(setInputValue(''));
  };
  return (
    <form onSubmit={handleToDoAdd}>
      <input
        autoFocus
        type="text"
        onChange={handleInputChange}
        value={inputValue}
      />
      <button
        style={{
          fontSize: 16,
          width: 40,
        }}
        type="submit"
      >
        +
      </button>
    </form>
  );
}
