import React, { useState } from 'react';
import { Button } from 'antd';
import { useAuth } from '../../hooks/auth';
import getOAuthProvider from '../../utils/get-OAuth-provider';
import { OAuthProvider } from '../../types/auth';

type Props = {
  providers: OAuthProvider[];
};

function AuthSocial({ providers }: Props): JSX.Element {
  const auth = useAuth();
  const [pending, setPending] = useState('');

  const onSigninWithProvider = async (providerName: string) => {
    const provider = getOAuthProvider(providerName);
    if (!provider) return;
    setPending(providerName);
    const { data } = await auth.getProviderServiceId(providerName);
    const { service_id: serviceId } = data;
    window.location.href = `${provider.serviceUrl}${serviceId}&redirect_uri=${provider.redirectURI}`;
  };

  return (
    <>
      {providers.map(provider => (
        <div key={provider.name}>
          <Button
            type="primary"
            block
            onClick={() => {
              onSigninWithProvider(provider.name);
            }}
            disabled={pending === provider.name}>
            {pending === provider.name && <>...</>}
            Войти через {provider.name}
          </Button>
        </div>
      ))}
    </>
  );
}

export default AuthSocial;
