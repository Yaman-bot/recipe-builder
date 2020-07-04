import React from 'react'
import './Input.css'

const input=(props)=>{
    let inputEl=null
    const inputClasses=['InputElement']

    if(props.inValid && props.shouldValidate && props.touched){
        inputClasses.push('Invalid')
    }

    switch(props.elementType){
        case('input'):
            inputEl=<input className={inputClasses.join(' ')} {...props.elementConfig}  value={props.value} onChange={props.changed}/>
            break;
        case('textarea'):
            inputEl=<textarea className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>
            break
            case('select'):
            inputEl=(
                <select  className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}>
                    {props.elementConfig.options.map(option=>(
                        <option key={option} value={option.value}>{option.displayValue}</option>
                    ))}
                </select>
            )
            break;
        default:
            inputEl=<input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>
           
    }
    return(
        <div className='Input'> 
            <label className='Label'>{props.label}</label>
            {inputEl}
        </div>
    )
}

export default input;