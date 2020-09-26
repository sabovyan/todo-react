import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeToDo,
  CompleteToDo,
  changeToDoEditStatus,
  changeToDoEditValue,
  confirmToDoEditValue,
} from '../../store/reducer/todo';
import styles from './ToDoList.module.css';

const VIEWS = {
  active: 'ACTIVE',
  completed: 'COMPLETED',
  all: 'ALL',
};

function ToDoList() {
  const { toDos } = useSelector((store) => {
    return store;
  });

  const dispatch = useDispatch();

  const handleToDoRemove = (id) => () => {
    dispatch(removeToDo(id));
  };

  const handleToDoStatus = (id) => () => {
    dispatch(CompleteToDo(id));
  };

  const handleToDoEditStatus = (id) => () => {
    dispatch(changeToDoEditStatus(id));
  };

  const handleToDoEditValue = (id) => ({ target: { value } }) => {
    dispatch(changeToDoEditValue({ id, value }));
  };

  const handleToDoEditSubmit = (id) => (event) => {
    event.preventDefault();

    dispatch(confirmToDoEditValue(id));
    dispatch(changeToDoEditStatus(id));
  };

  const [view, setView] = useState(VIEWS.active);
  const handleViewChange = (view) => () => {
    setView(view);
  };

  const getFilteredToDos = (toDos, view) => {
    switch (view) {
      case VIEWS.all:
        return toDos;
      case VIEWS.completed:
        return toDos.filter((t) => t.isComplete === true);
      case VIEWS.active:
        return toDos.filter((t) => t.isComplete === false);
      default:
        return toDos;
    }
  };

  const filteredTodos = getFilteredToDos(toDos, view);

  return (
    <>
      <div>
        <ul className={styles.tabs}>
          {/*  <li className={styles.tab}>All</li>
          <li className={styles.tab}>Active</li>
          <li className={styles.tab}>Completed</li> */}
          {Object.entries(VIEWS).map(([key, value]) => (
            <li
              key={key}
              style={{
                textDecoration: value === view ? 'underline' : 'none',
              }}
              onClick={handleViewChange(value)}
              className={styles.tab}
            >
              {key}
            </li>
          ))}
        </ul>
      </div>
      <ul className={styles.todos}>
        {filteredTodos.map((t) =>
          t.isEdit ? (
            <form
              className={styles.todo__input}
              key={t.id}
              onSubmit={handleToDoEditSubmit(t.id)}
            >
              <input
                onChange={handleToDoEditValue(t.id)}
                value={t.draftValue}
                autoFocus
              />
            </form>
          ) : (
            <li className={styles.todo} key={t.id}>
              <span
                className={styles.todo__content}
                onClick={handleToDoEditStatus(t.id)}
                style={{
                  textDecoration: t.isComplete ? 'line-through' : 'none',
                }}
              >
                {t.value}
              </span>
              <span
                onClick={handleToDoStatus(t.id)}
                aria-label="done"
                role="img"
                style={{
                  cursor: 'pointer',
                }}
              >
                {t.isComplete ? '✔' : '❔'}
              </span>
              <span
                onClick={handleToDoRemove(t.id)}
                aria-label="delete"
                role="img"
                style={{
                  cursor: 'pointer',
                }}
              >
                ❌
              </span>
            </li>
          )
        )}
      </ul>
    </>
  );
}
export default ToDoList;
