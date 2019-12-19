import { combineReducers } from '@reduxjs/toolkit';

import status from 'state/status';
import auth from 'state/auth';
import story from 'state/story';

const rootReducer = combineReducers({
  status,
  auth,
  story,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
