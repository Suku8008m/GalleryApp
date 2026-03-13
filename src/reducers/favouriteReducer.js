export const initFavs = (init) => {
  try {
    const list = localStorage.getItem('favs');
    return list ? JSON.parse(list) : init;
  } catch (err) {
    return init;
  }
};

export const favReducer = (state, action) => {
  if (action.type === 'TOGGLE') {
    const p = action.payload;
    const exists = state.find((x) => x.id === p.id);
    const nextState = exists ? state.filter((x) => x.id !== p.id) : [...state, p];
    
    try {
      localStorage.setItem('favs', JSON.stringify(nextState));
    } catch (e) {
      console.warn('ls error', e); 
    }
    return nextState;
  }
  
  return state;
};
