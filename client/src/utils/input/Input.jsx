import React from 'react';


const Input = (props) => {
    return (
        <input onChange={(event)=> props.setValue(event.target.value)}
               value={props.value}
               className={`font-light border-2 w-full h-12 p-4 pl-10 placeholder-slate-400 ${props.className}`}
               type={props.type}
               placeholder={props.placeholder}
               min={props.min}
               max={props.max}
        />
    );
};

export default Input;
