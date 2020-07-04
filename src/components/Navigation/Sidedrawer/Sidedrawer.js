import React from 'react'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import './SideDrawer.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Auxiliary'

const sidedrawer =(props)=>{
    let attachedClasses=['SideDrawer','Close']
    if(props.open){
        attachedClasses=['SideDrawer','Open']
    }
    return(
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                <div className='LogoSide'>
                    <Logo/>
                </div>
                <nav >
                    <NavigationItems isAuthenticated={props.isAuth}/>
                </nav>
            </div>
        </Aux>
    )
}

export default sidedrawer;