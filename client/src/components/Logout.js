import { useContext, useEffect } from "react";
import { AppContext } from '../App';

import { Navigate } from 'react-router-dom';

function Logout() {
    const {onLogout} = useContext(AppContext);
    useEffect(() => {
        onLogout();
    }, [onLogout]);
    return <Navigate to="/" /> 
}
export default Logout;