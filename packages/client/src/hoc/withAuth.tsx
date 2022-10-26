import { useNavigate } from 'react-router';
import React, { useEffect } from 'react';
import { useAuth } from '../hooks/auth';
import PageLoader from '../components/page-loader';

const withAuth = (Component: React.FC) =>
  function withAuthHOC(props: any) {
    const navigate = useNavigate();
    const auth = useAuth();
    const { isLoggedIn, isLoading } = auth;
    useEffect(() => {
      if (!isLoggedIn && !isLoading) {
        navigate('/sign-in');
      }
    }, [auth]);
    // eslint-disable-next-line react/jsx-props-no-spreading
    return isLoading ? <PageLoader /> : <Component {...props} />;
  };

export default withAuth;
