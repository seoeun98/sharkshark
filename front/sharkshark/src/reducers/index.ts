import { combineReducers } from 'redux';
import ghAPIReducer from './ghAPIReducer';

const rootReducer = combineReducers({
  ghAPIReducer,
});

export default rootReducer;
