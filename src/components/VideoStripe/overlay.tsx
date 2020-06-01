import React from 'react';
import classes from './scss/overlay.module.css';

const overlay = props => (
    <div className={classes.InfoCard}>
        <div className={classes.Title}>{props.title}</div>
        <div className={classes.Subtitle}>{props.subtitle}</div>
        <button className={classes.Button}>Youtube page</button>
    </div>
);

export default overlay;
