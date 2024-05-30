import {
  START_FETCHING_BANKS,
  SUCCESS_FETCHING_BANKS,
  ERROR_FETCHING_BANKS,
} from './constanta';

const statuslist = {
  idle: 'idle',
  process: 'process',
  success: 'success',
  error: 'error',
};

const initialState = {
  data: [],
  status: statuslist.idle,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START_FETCHING_BANKS:
      return { ...state, status: statuslist.process };

    case ERROR_FETCHING_BANKS:
      return { ...state, status: statuslist.error };

    case SUCCESS_FETCHING_BANKS:
      return {
        ...state,
        status: statuslist.success,
        data: action.banks,
      };

    default:
      return state;
  }
}