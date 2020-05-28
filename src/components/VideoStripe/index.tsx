import React from 'react';
import './scss/index.scss';
import Overlay from './overlay';

const videoStripe = props => (
    <div className="video-background">
        <div className="video-foreground">
            <Overlay title="" subtitle=""/>
            <iframe
                width="100%"
                height="100%"
                src="https://www.youtube-nocookie.com/embed/QVkZcHPHkc8?controls=0&autoplay=1&modestbranding=1&mute=1&loop=1&playlist=QVkZcHPHkc8"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
            </iframe>
        </div>
    </div>
);

export default videoStripe;
