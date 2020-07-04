import React, { Component } from 'react'
import './Modal.css'
import Aux from '../../../hoc/Auxiliary'
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component{

    shouldComponentUpdate(nextProps,nextState){
        return nextProps.show !== this.props.show || nextProps.children !==this.props.children 
        //In this way modal will only re-render when it is opened and not render when it is closed
    }

    render(){
        return(
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div className='Modal' style={{
                    transform:this.props.show ? 'translateY(0)':'translateY(-100vh)',
                    opacity:this.props.show ? '1':'0'
                }}>
                    {this.props.children}
                </div>
            </Aux>
        )
    }
}

export default Modal;