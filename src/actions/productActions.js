import * as actions from '../constants/productConstants';
import axios from 'axios';

const listProducts = () => async (dispatch) => {
        try {
                dispatch({ type: actions.PRODUCT_LIST_REQUEST });
                const { data } = await axios.get(`/api/books`);
                console.log(data);
                dispatch({ type: actions.PRODUCT_LIST_SUCCESS, payload: data });
        } 
        catch(error)
        {
                dispatch({ type: actions.PRODUCT_LIST_FAIL, payload: error.message });
        }
}

export { listProducts };