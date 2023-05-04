import React from 'react';
import "../assets/style/InputInitialPages.css";

function InputInitialPages(props) {
    const { name, placeholder } = props

    return (
        <div>
            <input className='input-initial-page'
                type="text"
                name={name}
                placeholder={placeholder}
            />
            <br />
        </div>
    )
}

export default InputInitialPages;