import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export const addIngredient=(ingredientName)=>{
    return {
        type:actionTypes.ADD_INGREDIENT,
        ingredientName:ingredientName
    }
}

export const removeIngredient=(ingredientName)=>{
    return {
        type:actionTypes.REMOVE_INGREDIENT,
        ingredientName:ingredientName
    }
}

export const setIngredients=(ingredients)=>{
    return {
        type:actionTypes.SET_INGREDIENTS,
        ingredients:ingredients
    }
}

export const fetchIngredientsFailed=()=>{
    return {
        type:actionTypes.FETCH_INGREDIENTS_FAILED

    }
}

export const initIngredients=()=>{
    return async dispatch=>{
        try{
            const response=await axios.get('https://burger-builder-a96e5.firebaseio.com/ingredients.json')
            dispatch(setIngredients(response.data))
        }catch(err){
            dispatch(fetchIngredientsFailed())
        }
        
    }
}