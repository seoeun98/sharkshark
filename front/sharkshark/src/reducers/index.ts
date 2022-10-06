import { combineReducers } from 'redux';
import ghAPIReducer from './ghAPIReducer';
import CTReducer from './CTReducer';
import rivalAPIReducer from './rivalAPIReducer';
import DataChartReducer from './DataChartReducer';

const rootReducer = combineReducers({
  ghAPIReducer,
  CTReducer,
  rivalAPIReducer,
  DataChartReducer,
});

export default rootReducer;
