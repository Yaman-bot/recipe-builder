import React, { Component } from 'react'
import {connect} from 'react-redux'
import Aux from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as orderActions from '../../store/actions/order'
import * as burgerBuilderActions from '../../store/actions/burgerBuilder'
import * as authActions from '../../store/actions/auth'


class BurgerBuilder extends Component{
    constructor(props){
        super(props)
        this.state={
            //These two can be managed by redux
            //ingredients:null,
            //totalPrice:2,
            //Below are the LOcal UI state
            purchasing:false
        }
    }

    componentDidMount(){
        this.props.onInitIngredient()
    }

    updatePurchase=(ingredients)=>{
        const sum=Object.keys(ingredients).map(ing=>{
            return ingredients[ing]
        }).reduce((sum,el)=>{
            return sum+el
        },0)
        return sum>0
    }

    purchaseHandler=()=>{
        if(this.props.isAuthenticated){
            this.setState({purchasing:true})
        }else{
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth')
        }
    }

    purchaseCancelHandler=()=>{
        this.setState({purchasing:false})
    }

    purchaseContinueHandler=async ()=>{
        this.props.onInitPurchase()
        this.props.history.push('/checkout')
    }

    render(){
        const disabledinfo={...this.props.ings}

        for(let key in disabledinfo){
            disabledinfo[key]=disabledinfo[key]<=0
        }

        let orderSummary=null

        let burger=this.props.error ? <p>Ingredients Can't be loaded.</p> : null

        if(this.props.ings){
            burger=(
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdded} 
                        ingredientRemoved={this.props.onIngredientRemoved} 
                        disabled={disabledinfo} 
                        price={this.props.price} 
                        purchasable={this.updatePurchase(this.props.ings)}
                        isAuth={this.props.isAuthenticated}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            )
            orderSummary=<OrderSummary 
                ingredients={this.props.ings}
                price={this.props.price}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
            />   
        }

        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}


const mapStateToProps=state=>{
    return {
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error,
        isAuthenticated:state.auth.token !== null
    }
}

const mapDispatchToProps=dispatch=>{
    return {
        onIngredientAdded:(ingName)=>dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved:(ingName)=>dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredient:()=>dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase:()=>dispatch(orderActions.purchaseInit()),
        onSetAuthRedirectPath:(path)=>dispatch (authActions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios))