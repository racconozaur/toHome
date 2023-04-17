import React from 'react';

const ButtonFilter = (props) => {

    let btnClass = `w-full h-8 mb-4 bg-cyellow text-cblue rounded-lg sm:w-min sm:h-min sm:px-6 sm:py-3 ${props.className} ` 

    return (
        <button className={btnClass } onClick={props.onClick} disabled={props.disabled}>
            {props.children}
        </button>
    );
};

export default ButtonFilter;