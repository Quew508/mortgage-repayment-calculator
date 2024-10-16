import React from 'react';

const Button = ({type, hasImage=false, image, buttonText}) => {
    return (
        <button type={type}>{hasImage ? (<img src={image} alt='button' loading='eager'/>) : ''} {buttonText}</button>
    )
}

export default Button;