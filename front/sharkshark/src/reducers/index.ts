import { combineReducers } from 'redux';
import ghAPIReducer from './ghAPIReducer';
import CTReducer from './CTReducer';

const rootReducer = combineReducers({
  ghAPIReducer,
  CTReducer,
});

export default rootReducer;
