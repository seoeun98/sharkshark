import { combineReducers } from 'redux';
import ghAPIReducer from './ghAPIReducer';
import CTReducer from './CTReducer';
import rivalAPIReducer from './rivalAPIReducer';

const rootReducer = combineReducers({
  ghAPIReducer,
  CTReducer,
  rivalAPIReducer,
});

export default rootReducer;
