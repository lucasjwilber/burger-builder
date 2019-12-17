import React from 'react';
import classes from './Spinner.module.css';

const spinner = () => {
  return  (
    <React.Fragment>
      <p style={{textAlign: 'center', marginBottom: '-4em'}}>Loading...</p>
      <div className={classes.Loader}> </div>
    </React.Fragment>
  );
};

export default spinner;