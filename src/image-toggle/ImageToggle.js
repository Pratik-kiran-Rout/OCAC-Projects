import React, { useState } from 'react';
import './ImageToggle.css';

const ImageToggle = () => {
    const [isVisible, setIsVisible] = useState(true);

    const toggleImage = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div className="image-toggle-container">
            <button className="toggle-button" onClick={toggleImage}>
                {isVisible ? 'Hide Image' : 'Show Image'}
            </button>
            <div className={`image-container ${isVisible ? 'visible' : 'hidden'}`}>
                <img
                    src="https://plus.unsplash.com/premium_photo-1682124752476-40db22034a58?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Sample"
                    className="toggle-image"
                />
            </div>
        </div>
    );
};

export default ImageToggle;
