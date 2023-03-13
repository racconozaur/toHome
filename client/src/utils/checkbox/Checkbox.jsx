import React from 'react';

const Checkbox = (props) => {

    

    return (
        <input id={props.single} checked={props.checked} onChange={() => alert('you can only check all')} type="checkbox" value="" className={props.className}/>
    );
};

export default Checkbox;