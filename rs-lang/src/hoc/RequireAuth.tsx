import React from 'react';
import { useLocation, Navigate} from 'react-router-dom';

import { useAppSelector } from '../hooks/hooks';

type RequireAuthType = {
  children: JSX.Element;
}

const RequireAuth: React.FC<RequireAuthType> = ({children}) => {
  const isAuth = useAppSelector(state => state.user?.user?.message === 'Authenticated');
  const location = useLocation();
  
  if (!isAuth) {
    return <Navigate to='/noauth' replace={true} state={{from: location.pathname}} />;
  } 
  return children;
}

export default RequireAuth