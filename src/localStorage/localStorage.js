export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Ошибка загрузки состояния из localStorage:", err);
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reduxState", serializedState);
  } catch (err) {
    console.error("Ошибка сохранения состояния в localStorage:", err);
  }
};

export const subscribeToStore = (store) => {
  store.subscribe(() => {
    const state = store.getState();
    saveState({
      users: {
        ...state.users,
        loading: false,
        error: null,
      },
      chats: state.chats,
    });
  });
};
