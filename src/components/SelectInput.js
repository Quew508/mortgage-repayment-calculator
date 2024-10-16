import React from 'react';

const SelectInput = ({id, name, type, stateValue, selectedValue, handleChange}) => {
    return (
        <div className={`${name}-type ${stateValue === selectedValue ? `${name}-selected` : ''}`}>
            <input
                type="radio"
                id={id}
                name={type}
                value={selectedValue}
                checked={stateValue === selectedValue}
                onChange={handleChange}
            />
            <label htmlFor={id}>{selectedValue}</label>
        </div>
    )
}

export default SelectInput;