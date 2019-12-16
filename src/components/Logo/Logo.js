import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css';

const logo = (props) => (
  <div className={classes.Logo} style={{height: props.height}}>
    {/* can't hard code the image source because of how webpack/react works */}
    <img src={burgerLogo} alt='hamburger logo' />
  </div>
);

export default logo;