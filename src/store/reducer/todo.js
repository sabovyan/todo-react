import { createSlice } from '@reduxjs/toolkit';

const makeUniqueId = () => {
  let id = 0;
  return () => {
    id += 1;
    return id;
  };
};

const VIEWS = {
  all: 'ALL',
  active: 'ACTIVE',
  completed: 'COMPLETED',
};

const getUniqueId = makeUniqueId();

const { reducer, actions } = createSlice({
  name: 'toDos',
  initialState: [],
  reducers: {
    addToDo: (state, action) => [
      ...state,
      {
        value: action.payload,
        id: getUniqueId(),
        isComplete: false,
        isEdit: false,
      },
    ],

    removeToDo: (state, { payload }) =>
      state.filter((todo) => todo.id !== payload),

    CompleteToDo: (state, { payload }) =>
      state.map((t) =>
        t.id === payload
          ? { ...t, isComplete: !t.isComplete, draftValue: t.value }
          : t
      ),

    changeToDoEditStatus: (state, { payload }) =>
      state.map((t) => {
        return t.id === payload
          ? { ...t, isEdit: !t.isEdit, draftValue: t.value }
          : t;
      }),
    changeToDoEditValue: (state, { payload }) =>
      state.map((t) =>
        t.id === payload.id ? { ...t, draftValue: payload.value } : t
      ),

    confirmToDoEditValue: (state, { payload }) =>
      state.map((t) => {
        if (t.draftValue === '') {
          return t;
        }
        return t.id === payload ? { ...t, value: t.draftValue } : t;
      }),
  },
});

export const {
  addToDo,
  removeToDo,
  CompleteToDo,
  changeToDoEditStatus,
  changeToDoEditValue,
  confirmToDoEditValue,
  filterToDos,
} = actions;

export default reducer;
