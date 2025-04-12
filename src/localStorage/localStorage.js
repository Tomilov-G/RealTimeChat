export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (serializedState === null) return undefined;
    const state = JSON.parse(serializedState);
    if (state) {
      state.allChats = Array.isArray(state.allChats) ? state.allChats : [];
      state.createdChats = Array.isArray(state.createdChats)
        ? state.createdChats
        : [];
    }
    return state;
  } catch (err) {
    console.error("Error loading state from localStorage:", err);
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reduxState", serializedState);
  } catch (err) {
    console.error("Error saving state to localStorage:", err);
  }
};

export const subscribeToStore = (store) => {
  let previousState = store.getState();
  store.subscribe(() => {
    const state = store.getState();
    // Save only if chats or users have changed
    if (
      state.chats !== previousState.chats ||
      state.users !== previousState.users
    ) {
      saveState({
        users: {
          ...state.users,
          loading: false,
          error: null,
        },
        chats: state.chats,
      });
    }
    previousState = state;
  });
};
