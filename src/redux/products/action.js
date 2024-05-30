import {
  START_FETCHING_PRODUCTS,
  SUCCESS_FETCHING_PRODUCTS,
  ERROR_FETCHING_PRODUCTS,
  SET_KEYWORD,
} from './constanta';

import { getData } from '../../utils/fetch';
import debounce from 'debounce-promise';
import { clearNotif } from '../notif/action';

let debouncedFetchProducts = debounce(getData, 1000);

export const startFetchingProducts = () => {
  return {
    type: START_FETCHING_PRODUCTS,
  };
};

export const successFetchingProducts = ({ products }) => {
  return {
    type: SUCCESS_FETCHING_PRODUCTS,
    products,
  };
};

export const errorFetchingProducts = () => {
  return {
    type: ERROR_FETCHING_PRODUCTS,
  };
};

export const fetchTalents = () => {
  return async (dispatch, getState) => {
    dispatch(startFetchingProducts());

    try {
      setTimeout(() => {
        dispatch(clearNotif());
      }, 5000);

      let params = {
        keyword: getState().products.keyword,
      };

      let res = await debouncedFetchProducts('/cms/products', params);

      console.log(res)

      res.data.data.forEach((res) => {
        res.avatar = res.image.name;
      });

      dispatch(
        successFetchingProducts({
          products: res.data.data,
        })
      );
    } catch (error) {
      dispatch(errorFetchingProducts());
    }
  };
};

export const setKeyword = (keyword) => {
  return {
    type: SET_KEYWORD,
    keyword,
  };
};