import React from 'react';

const Button = (props) => {

    let btnClass = `m-1 rounded-lg ${props.className} ` 

    return (
        <button className={btnClass} onClick={props.onClick} disabled={props.disabled}>
            {props.children}
        </button>
    );
};

export default Button;