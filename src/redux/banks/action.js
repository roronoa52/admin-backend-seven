import {
  START_FETCHING_BANKS,
  SUCCESS_FETCHING_BANKS,
  ERROR_FETCHING_BANKS,
} from './constanta';

import { getData } from '../../utils/fetch';
import debounce from 'debounce-promise';
// import { clearNotif } from '../notif/actions';

let debouncedFetchBanks = debounce(getData, 1000);

// START
export const startFetchingBanks = () => {
  return {
    type: START_FETCHING_BANKS,
  };
};

// SUCCESS
export const successFetchingBanks = ({ banks }) => {
  return {
    type: SUCCESS_FETCHING_BANKS,
    banks,
  };
};

export const errorFetchingBanks = () => {
  return {
    type: ERROR_FETCHING_BANKS,
  };
};

export const fetchBanks = () => {
  return async (dispatch) => {
    dispatch(startFetchingBanks());

    try {
      // setTimeout(() => {
      //   dispatch(clearNotif());
      // }, 3000);

      let res = await debouncedFetchBanks('/cms/banks');

      dispatch(
        successFetchingBanks({
          banks: res.data.data,
        })
      );
    } catch (error) {
      dispatch(errorFetchingBanks());
    }
  };
};