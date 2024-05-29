import React, { createContext, useReducer } from "react";
import reducerFunction from "./pages/Reducer"; // Import reducer
import Intro from "./components/Intro";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Todos from "./components/Todos";

const INITIAL_STATE = [];

export const TodoContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducerFunction, INITIAL_STATE);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {" "}
      <RouterProvider
        router={createBrowserRouter([
          {
            path: "/",
            element: <Intro />,
          },
          {
            path: "todos",
            element: <Todos />,
          },
        ])}
      />
    </TodoContext.Provider>
  );
}

export default App;
