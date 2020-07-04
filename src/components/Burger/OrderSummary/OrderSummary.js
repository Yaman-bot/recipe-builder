import React, { Component } from 'react'
import Aux from '../../../hoc/Auxiliary'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component{
    render(){
        let ingredientSummary=Object.keys(this.props.ingredients).map(ing=>{
            return (
                <li key={ing}>
                    <span style={{textTransform:'capitalize'}}> {ing} </span> :{this.props.ingredients[ing]}
                </li>
            )
        })
        return(
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious Burger with following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price:${this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout</p>
                <Button btnType='Danger' clicked={this.props.purchaseCanceled}>CANCEL</Button>
                <Button btnType='Success' clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        )
    }
    
}

export default OrderSummary