import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../../components/Logo/Logo.js';
import NavigationItems from '../NavigationItems/NavigationItems.js';

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <div
      className={classes.MenuButton}
      onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
    <Logo height='80%'/>
    <nav className={classes.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
)

export default toolbar;