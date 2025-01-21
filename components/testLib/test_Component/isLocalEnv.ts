import getConfig from 'next/config';

import { LOCAL_ENVIRONMENT } from './env';

const isLocalEnv = (): boolean => {
    return getConfig()?.publicRuntimeConfig?.SPA_ENV_TYPE === LOCAL_ENVIRONMENT;
};

export default isLocalEnv;
