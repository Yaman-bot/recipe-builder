import React from 'react'
import './Burger.css'
import BurgerIngredient from './BurgerIngredients/BurgerIngredients';

const burger=(props)=>{
    let transformedIngredients=Object.keys(props.ingredients)
        .map(ing=>{
            return [...Array(props.ingredients[ing])]    //This gives a array of length of value of ingredients and the array elements are not important
            .map((_,i)=>{                                //as here we map them with <BurgerIngredinents/>
               return <BurgerIngredient key={ing +i} type={ing}/>
            })
        }).reduce((prev,curr)=>{   //This method is to flatten the transformed Ingredients as it currently is like [Array(),Array(),Array(),Array()]
            return prev.concat(curr)
        },[])
    
    if(transformedIngredients.length===0){
        transformedIngredients=<p>Please start adding some ingredients</p>
    }
    return(
        <div className='Burger'>
            <BurgerIngredient type='bread-top'/>
                {transformedIngredients}
            <BurgerIngredient type='bread-bottom'/>
        </div>
    )
}

export default  burger;