import React from 'react';
import classes from './scss/overlay.module.css';

const overlay = props => (
    <>
        <div>{props.title}</div>
        <div>{props.subtitle}</div>
        <button className={classes.Button}>Youtube page</button>
    </>
)

export default overlay;
