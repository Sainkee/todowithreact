export default function reducerFunction(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, { ...action.payload }];
    case "UPDATE_TODO":
      const updatedList = state.map((item) => {
        if (item.id === action.payload.id)
          return {
            ...item,
            ...action.payload,
          };
      });
      return updatedList;
    case "DELETE_TODO":
      return state.filter((item) => item.id !== action.payload.id);
    case "search":
      return state.filter((item) =>
        item.title.toLowerCase().includes(action.payload.toLowerCase())
      );
      case "SORT_TODOS":
      const { sortDirection } = action.payload;
      const sortedState = [...state].sort((a, b) => {
        // Assuming createdAt is the property you want to sort by
        return sortDirection === "asc" ? a.createdAt - b.createdAt : b.createdAt - a.createdAt;
      });
      return sortedState;
    default:
      return state;
  }
}
