import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CurrentStatusState = {
  loading: boolean;
  error: string;
};

type ErrorPayload = {
  message: string;
  data: null;
};

type LoadingStatus = boolean;

const initialState: CurrentStatusState = {
  loading: false,
  error: '',
};

const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    changeLoadingState(state, action: PayloadAction<LoadingStatus>) {
      state.loading = action.payload;
      if (action.payload) state.error = '';
    },
    setError(state, action: PayloadAction<ErrorPayload>) {
      state.error = action.payload.message;
    },
  },
});

export const { changeLoadingState, setError } = statusSlice.actions;

export default statusSlice.reducer;
