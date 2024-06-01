import {
  START_FETCHING_BOOKINGS,
  SUCCESS_FETCHING_BOOKINGS,
  ERROR_FETCHING_BOOKINGS,
  SET_KEYWORD
} from './constanta';

import { getData } from '../../utils/fetch';
import debounce from 'debounce-promise';
import { clearNotif } from '../notif/action';

let debouncedFetchBookings = debounce(getData, 1000);

export const startFetchingBookings = () => {
  return {
    type: START_FETCHING_BOOKINGS,
  };
};

export const successFetchingBookings = ({ bookings }) => {
  return {
    type: SUCCESS_FETCHING_BOOKINGS,
    bookings,
  };
};

export const errorFetchingBookings = () => {
  return {
    type: ERROR_FETCHING_BOOKINGS,
  };
};

export const fetchBookings = () => {
  return async (dispatch, getState) => {
    dispatch(startFetchingBookings());

    try {
      setTimeout(() => {
        dispatch(clearNotif());
      }, 5000);

      let params = {
        keyword: getState().bookings.keyword,
      };

      let res = await debouncedFetchBookings('/cms/bookings', params);


      res.data.data.forEach((res) => {
        res.avatar = res.image.name;
      });

      dispatch(
        successFetchingBookings({
          bookings: res.data.data,
        })
      );
    } catch (error) {
      dispatch(errorFetchingBookings());
    }
  };
};

export const setKeyword = (keyword) => {
  return {
    type: SET_KEYWORD,
    keyword,
  };
};