import React, { Component } from 'react'
import  {connect} from 'react-redux'
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import  './ContactData.css';
import Input from '../../../components/UI/Input/Input'
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as orderActions from '../../../store/actions/order'

class ContactData extends Component{
    constructor(props){
        super(props)
        this.state={
            orderForm: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Name'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Street'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                zipCode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'ZIP Code'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 5,
                        maxLength: 6
                    },
                    valid: false,
                    touched: false
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Country'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your E-Mail'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            {value: 'fastest', displayValue: 'Fastest'},
                            {value: 'cheapest', displayValue: 'Cheapest'}
                        ]
                    },
                    value: 'fastest',
                    validation:{},
                    valid: true
                }
            },
            formIsValid: false
        }
    }

    orderHandler=async (event)=>{
        event.preventDefault()
        const formData={}
        for(let f in this.state.orderForm){
            formData[f]=this.state.orderForm[f].value
        }
        const order={
            ingredients:this.props.ings,
            price:this.props.price,
            orderData:formData,
            userId:this.props.userId
        }

        this.props.onBurgerOrder(order,this.props.token)
    }

    checkValidation=(value,rules)=>{
        let isValid=true
        if(rules.required){
            isValid=value.trim() !=='' && isValid
        }

        if(rules.minLength){
            isValid=value.length>=rules.minLength && isValid
        }
        
        if(rules.maxLength){
            isValid=value.length<=rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }



        return isValid
    }

    inputChangeHandler=(event,inputIdentifier)=>{
        //Mutating the state in immutable way
        const updatedForm={...this.state.orderForm}
        const updatedFormElement={...updatedForm[inputIdentifier]}//Cloning inner object deeply
        updatedFormElement.value=event.target.value

        updatedFormElement.valid=this.checkValidation(updatedFormElement.value,updatedFormElement.validation)
        updatedFormElement.touched=true

        updatedForm[inputIdentifier]=updatedFormElement

        let formIsValid=true
        for(let inputIdentfier in updatedForm){
            formIsValid=updatedForm[inputIdentfier].valid && formIsValid
        }

        this.setState({orderForm:updatedForm,formIsValid:formIsValid})      
    }

    render () {
        const formElementsArray=[]
        for (let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            })

        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement=>(
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        inValid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event)=>this.inputChangeHandler(event,formElement.id)}
                    />
                ))}
                <Button btnType="Success" clicked={this.orderHandler} disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if ( this.props.loading ) {
            form = <Spinner />;
        }
        return (
            <div className='ContactData'>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}


const mapStateToProps=state=>{
    return {
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        loading:state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
}

const mapDispatchToProps=dispatch=>{
    return {
        onBurgerOrder:(orderData,token)=>dispatch(orderActions.purchaseBurger(orderData,token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));