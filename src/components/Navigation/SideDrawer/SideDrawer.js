import React from 'react';
import Logo from '../../Logo/Logo.js';
import NavigationItems from '../NavigationItems/NavigationItems.js';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop.js';

const sideDrawer = (props) => {
  const attachedClasses = [classes.SideDrawer];
  if (props.open) {
    attachedClasses.push(classes.Open);
  } else {
    attachedClasses.push(classes.Closed);
  }
  return (
    <React.Fragment>
      <Backdrop 
        show={props.open} 
        closed={props.closed}/>
      <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </React.Fragment>
  )
}

export default sideDrawer;