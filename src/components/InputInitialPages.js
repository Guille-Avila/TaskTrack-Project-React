import React from 'react';
import "../assets/style/InputInitialPages.css";

function InputInitialPages(props) {
    const { value, placeholder, type, onChange } = props

    return (
        <div>
            <input className='input-initial-page'
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
            />
            <br />
        </div>
    )
}

export default InputInitialPages;