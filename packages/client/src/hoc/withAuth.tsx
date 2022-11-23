import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../hooks/auth';
import PageLoader from '../components/page-loader';

const withAuth = (Component: React.FC) =>
  function withAuthHOC(props: any) {
    const [searchParams] = useSearchParams();
    const OAuthCode = searchParams.get('code');
    const auth = useAuth();
    const navigate = useNavigate();
    const { isLoggedIn, isLoading } = auth;
    useEffect(() => {
      if (!isLoggedIn && !isLoading && OAuthCode) {
        auth.signInWithProvider(OAuthCode, navigate);
      }
      if (!isLoggedIn && !isLoading && !OAuthCode) {
        navigate('/sign-in');
      }
    }, [isLoggedIn, isLoading, OAuthCode]);
    // eslint-disable-next-line react/jsx-props-no-spreading
    return isLoading ? <PageLoader /> : <Component {...props} />;
  };

export default withAuth;
