import React, { useContext, useReducer, useEffect, useState } from "react";

import reducer from "../components/reducer";

const AppContext = React.createContext();
const INITIAL = {
  answers: [],
  startingPoint: 0,
  correct: 0,
  incorrect: 0,
  amount: 10,
  category: 21,
  formCompleted: false,
};
const URL = "https://opentdb.com/api.php?";

const ContextBody = ({ children }) => {
  const [items, dispatch] = useReducer(reducer, INITIAL);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const setForm = (e) => {
    e.preventDefault();
    dispatch({ type: "FORM_COMPLETED", payload: e });
  };
  const handleChanges = (e) => {
    dispatch({ type: "CHANGES", payload: e });
  };

  const handleClick = (e) => {
    dispatch({ type: "ANSWER_CLICKED", payload: e.target.innerHTML });
  };

  useEffect(() => {
    dispatch({ type: "FETCH_DATA", payload: data });
  }, [data]);

  const fetchData = async () => {
    const response = await fetch(
      `${URL}amount=${items.amount}&category=${items.category}`
    );
    const newData = await response.json();
    setData(newData.results);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, [items.amount, items.category]);

  return (
    <AppContext.Provider
      value={{ ...items, data, loading, handleClick, setForm, handleChanges }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { ContextBody, AppContext };
