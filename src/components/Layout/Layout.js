import React,{Component} from 'react'
import {connect} from 'react-redux'
import './Layout.css'
import Aux from '../../hoc/Auxiliary'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/Sidedrawer/Sidedrawer'

class Layout extends Component{
    constructor(props){
        super(props)
        this.state={
            showSideDrawer:false
        }
    }
    sideDrawerCloseHandler=()=>{
        this.setState({showSideDrawer:false})
    }
    sideDrawerToggleHandler=()=>{
        this.setState((prevstate)=>{
           return  {showSideDrawer:!prevstate.showSideDrawer}
        })
    }
    render(){
        return(
            <Aux>
                <Toolbar isAuth={this.props.isAuthenticated} toggle={this.sideDrawerToggleHandler}/>
                <SideDrawer isAuth={this.props.isAuthenticated}  closed={this.sideDrawerCloseHandler} open={this.state.showSideDrawer}/>
                <main className='Content'>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps=state=>{
    return {
        isAuthenticated:state.auth.token !==null
    }
}

export default  connect(mapStateToProps)(Layout)