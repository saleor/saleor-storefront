import React from 'react';
import classes from './scss/index.module.scss';
import Overlay from './overlay';

const videoStripe = props => (
    <a href="https://youtube.com" target="_blank">
        <div className={classes.VideoBackground}>
            <div className={classes.VideoForeground}>
                <Overlay title="V12 Athlete Craig" subtitle="Swiss Summer '19" />
                <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube-nocookie.com/embed/QVkZcHPHkc8?controls=0&autoplay=1&modestbranding=1&mute=1&loop=1&playlist=QVkZcHPHkc8"
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen>
                </iframe>
            </div>
        </div>
    </a>
);

export default videoStripe;
