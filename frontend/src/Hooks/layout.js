import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { checkAuthenticated, load_user } from '../Actions/auth';

const Layout = ({ checkAuthenticated, load_user, children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            await checkAuthenticated();
            if(checkAuthenticated) {
                setAuthenticated(true);
            } else {
                setAuthenticated(false);
            }
            await load_user();
        };

        fetchData();
    }, [checkAuthenticated, load_user]);

    

    return (
        <div style={{backgroundColor: 'transparent', display: !authenticated && 'none' }}>
            {children}
        </div>
    );
};

export default connect(null, { checkAuthenticated, load_user })(Layout);
