// Load state from localStorage
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (serializedState === null) return undefined;
    const state = JSON.parse(serializedState);
    if (state && state.chats) {
      // Ensure chats.allChats and chats.createdChats are arrays
      state.chats.allChats = Array.isArray(state.chats.allChats)
        ? state.chats.allChats
        : [];
      state.chats.createdChats = Array.isArray(state.chats.createdChats)
        ? state.chats.createdChats
        : [];
    }
    return state;
  } catch (err) {
    console.error("Error loading state from localStorage:", err);
    return undefined;
  }
};

// Save state to localStorage
export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reduxState", serializedState);
  } catch (err) {
    console.error("Error saving state to localStorage:", err);
  }
};

// Subscribe to store changes for persistence
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
