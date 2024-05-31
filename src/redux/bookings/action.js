import {
  START_FETCHING_BOOKINGS,
  SUCCESS_FETCHING_BOOKINGS,
  ERROR_FETCHING_BOOKINGS,
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

export const successFetchingBookings = ({ payments }) => {
  return {
    type: SUCCESS_FETCHING_BOOKINGS,
    payments,
  };
};

export const errorFetchingBookings = () => {
  return {
    type: ERROR_FETCHING_BOOKINGS,
  };
};

export const fetchBookings = () => {
  return async (dispatch) => {
    dispatch(startFetchingBookings());

    try {
      setTimeout(() => {
        dispatch(clearNotif());
      }, 5000);

      let res = await debouncedFetchBookings('/cms/bookings');

      res.data.data.forEach((res) => {
        res.avatar = res.image.name;
      });

      dispatch(
        successFetchingBookings({
          payments: res.data.data,
        })
      );
    } catch (error) {
      dispatch(errorFetchingBookings());
    }
  };
};