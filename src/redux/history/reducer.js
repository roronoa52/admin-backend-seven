import {
  START_FETCHING_HISTORY,
  SUCCESS_FETCHING_HISTORY,
  ERROR_FETCHING_HISTORY,
  SET_KEYWORD
} from './constanta';

const statuslist = {
  idle: 'idle',
  process: 'process',
  success: 'success',
  error: 'error',
};

const initialState = {
  data: [],
  keyword: '',
  status: statuslist.idle,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START_FETCHING_HISTORY:
      return { ...state, status: statuslist.process };

    case ERROR_FETCHING_HISTORY:
      return { ...state, status: statuslist.error };

    case SUCCESS_FETCHING_HISTORY:
      return {
        ...state,
        status: statuslist.success,
        data: action.history,
      };

    case SET_KEYWORD:
      return {
        ...state,
        keyword: action.keyword,
      };

    default:
      return state;
  }
}