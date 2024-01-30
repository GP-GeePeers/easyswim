import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { verify } from '../../../Actions/auth';

const Activate = ({ verify }) => {
    const navigate = useNavigate();
    const { uid, token } = useParams();

    const [verified, setVerified] = useState(false);

    const verify_account = () => {
        verify(uid, token);
        setVerified(true);
    };

    if (verified) {
        navigate('/login');
    }

    return (
        <div className='container'>
            <div 
                className='d-flex flex-column justify-content-center align-items-center'
                style={{ marginTop: '200px' }}
            >
                <h1>Verify your Account:</h1>
                <button
                    onClick={verify_account}
                    style={{ marginTop: '50px' }}
                    type='button'
                    className='btn btn-primary'
                >
                    Verify
                </button>
            </div>
        </div>
    );
};

export default connect(null, { verify })(Activate);
