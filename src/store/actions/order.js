import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export const purchaseBurgerStart=()=>{
    return {
        type:actionTypes.PURCHASE_BURGER_START,
    }
}

export const purchaseBurgerSuccess=(id,orderData)=>{
    return {
        type:actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId:id,
        orderData:orderData
    }
}

export const purchaseBurgerFailed=(error)=>{
    return {
        type:actionTypes.PURCHASE_BURGER_FAILED,
        error:error
    }
}

//Async Action
export const purchaseBurger=(orderData,token)=>{
    return async dispatch=>{
        dispatch(purchaseBurgerStart())
        try{
            const response=await axios.post('/orders.json?auth='+ token,orderData)
            dispatch(purchaseBurgerSuccess(response.data.name,orderData))
        }catch(error){
           dispatch(purchaseBurgerFailed(error))
        }
    }
}

export const purchaseInit=()=>{
    return{
        type:actionTypes.PURCHASE_INIT
    }
}


export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDER_START
    };
};


export const fetchOrdersSuccess = ( orders ) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders: orders
    };
};

export const fetchOrdersFail = ( error ) => {
    return {
        type: actionTypes.FETCH_ORDER_FAILED,
        error: error
    };
};


export const fetchOrders = (token,userId) => {
    return async dispatch => {
        dispatch(fetchOrdersStart());
        const queryParams='?auth=' + token +'&orderBy="userId"&equalTo="' + userId  +'"';
        try{
            const res= await axios.get('/orders.json'+ queryParams)
            const fetchedOrders=[]
            for (let key in res.data){
                fetchedOrders.push({
                    ...res.data[key],
                    id:key
                })
            }
            dispatch(fetchOrdersSuccess(fetchedOrders));
            
        }catch(error){
            dispatch(fetchOrdersFail(error));
        }
    };
};