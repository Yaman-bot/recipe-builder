import React from 'react'
import './Toolbar.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import menuIcon from '../../../assets/images/icons8-menu-100.png'

const toolbar=(props)=>{
    return(
        <header className='Toolbar'>
            <img onClick={props.toggle} className='menuIcon' src={menuIcon} alt='menuIcon'/>
            <div className='LogoToolbar'>
                <Logo/>
            </div>
            <nav className='DesktopOnly'>
                <NavigationItems isAuthenticated={props.isAuth}/>
            </nav>
        </header>
    )
}

export default toolbar;