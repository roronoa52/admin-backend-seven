import {
  START_FETCHING_BOOKINGS,
  SUCCESS_FETCHING_BOOKINGS,
  ERROR_FETCHING_BOOKINGS,
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
    case START_FETCHING_BOOKINGS:
      return { ...state, status: statuslist.process };

    case ERROR_FETCHING_BOOKINGS:
      return { ...state, status: statuslist.error };

    case SUCCESS_FETCHING_BOOKINGS:
      return {
        ...state,
        status: statuslist.success,
        data: action.bookings,
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