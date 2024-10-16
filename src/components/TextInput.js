import React from 'react';

const TextInput = ({ type, label, name, value, onChange, error, activeField, setActiveField }) => {
    const formattedValue = name === 'mortgageAmount' ? Number(value).toLocaleString() : value;

    return (
        <div role="textinput" className={`form-input-container ${name}`}>
            <label htmlFor={name}>{label}</label>
            <div className={`form-input ${name}-input ${error ? 'input-error': ''} ${activeField === name ? 'field-active' : ''}`}>
                <input
                    type={type}
                    id={name}
                    name={name}
                    value={formattedValue}
                    onChange={onChange}
                    onFocus={() => setActiveField(name)}
                    onBlur={() => setActiveField('')}
                    className={error ? 'error' : ''}
                />
            </div>
            {error && <p className="error-text">{error}</p>}
        </div>
    );
};

export default TextInput;
