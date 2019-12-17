import React, {Component} from 'react';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar.js';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer.js';

class Layout extends Component {

  state = {
    sideDrawerVisible: false
  }

  sideDrawerOpenHandler = () => this.setState({sideDrawerVisible: true});

  sideDrawerClosedHandler = () => this.setState({sideDrawerVisible: false});
  
  render() {
    return (
    <React.Fragment>
      <Toolbar clicked={this.sideDrawerOpenHandler}/>
      <SideDrawer 
        open={this.state.sideDrawerVisible}
        closed={this.sideDrawerClosedHandler}/>
      <main className={classes.Content}>
        {this.props.children}
      </main>
    </React.Fragment>
    )
  }
};

export default Layout;