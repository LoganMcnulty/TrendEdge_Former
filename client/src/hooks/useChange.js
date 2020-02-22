import { useReducer } from 'react';


function reducer(state, { field, value }) {
  return {
    ...state,
    [field]: value,
  };
}

export const useChange = () => {
  const [state, dispatch] = useReducer(reducer, userSettings);
  const handleChange = e => {
    dispatch({ field: e.target.name, value: e.target.value });
  };
  return handleChange
};

