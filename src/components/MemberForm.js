import React from 'react';
import "../assets/style/FormList.css";

const MemberForm = ({ show, handleButtonClick }) => {

    return (

        <div className='box-form-list'
            style={show ? { visibility: 'visible' } : { visibility: 'hidden' }}>
            <h3>Member</h3>
            <input type='text' placeholder='Member Name' ></input>
            <input type='text' placeholder='Member Email'></input>

            <div>
                <button type="button" onClick={handleButtonClick}>Cancel</button>
                <button type="button" onClick={handleButtonClick}>Save</button>
            </div>
        </div>

    );
};

export default MemberForm;