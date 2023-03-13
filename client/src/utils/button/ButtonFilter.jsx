import React from 'react';

const ButtonFilter = (props) => {

    let btnClass = `px-6 py-3 mr-4 mb-4 bg-cyellow text-cblue rounded-lg ${props.className} ` 

    return (
        <button className={btnClass} onClick={props.onClick} disabled={props.disabled}>
            {props.children}
        </button>
    );
};

export default ButtonFilter;