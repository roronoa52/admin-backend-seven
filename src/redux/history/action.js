import {
  START_FETCHING_HISTORY,
  SUCCESS_FETCHING_HISTORY,
  ERROR_FETCHING_HISTORY,
  SET_KEYWORD
} from './constanta';

import { getData } from '../../utils/fetch';
import debounce from 'debounce-promise';
import { clearNotif } from '../notif/action';

let debouncedFetchHistory = debounce(getData, 1000);

export const startFetchingHistory = () => {
  return {
    type: START_FETCHING_HISTORY,
  };
};

export const successFetchingHistory = ({ history }) => {
  return {
    type: SUCCESS_FETCHING_HISTORY,
    history,
  };
};

export const errorFetchingHistory = () => {
  return {
    type: ERROR_FETCHING_HISTORY,
  };
};

export const fetchHistory = () => {
  return async (dispatch, getState) => {
    dispatch(startFetchingHistory());

    try {
      setTimeout(() => {
        dispatch(clearNotif());
      }, 5000);

      let params = {
        keyword: getState().history.keyword,
      };

      let res = await debouncedFetchHistory('/cms/historybookings', params);


      res.data.data.forEach((res) => {
        res.avatar = res.image.name;
      });

      dispatch(
        successFetchingHistory({
          history: res.data.data,
        })
      );
    } catch (error) {
      dispatch(errorFetchingHistory());
    }
  };
};

export const setKeyword = (keyword) => {
  return {
    type: SET_KEYWORD,
    keyword,
  };
};