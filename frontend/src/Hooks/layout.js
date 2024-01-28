import React, { useEffect } from 'react';
import Navbar from '../Components/AuthNavbar/AuthNavbar';
import { connect } from 'react-redux';
import { checkAuthenticated, load_user } from '../Actions/auth';

const Layout = ({ checkAuthenticated, load_user, children }) => {
    useEffect(() => {
        checkAuthenticated();
        load_user();
    }, []);

    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
};

export default connect(null, { checkAuthenticated, load_user })(Layout);