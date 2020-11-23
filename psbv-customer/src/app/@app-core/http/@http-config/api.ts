import { InjectionToken } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

export const API_URL = new InjectionToken<string>('apiUrl');

export const APICONFIG = {
  BASEPOINT: environment.apiUrl,
  AUTH: {
    LOGIN: '/app/auth/login',
    SIGNUP: `/app/auth/signup`,
    RESET_PASSWORD_EMAIL: `/app/reset_password/send_code`,
    CHECK_CODE_RESET: `/app/reset_password/check_code`,
    RESET_PASSWORD: `/app/reset_password/reset_password`
  },
  ACCOUNT: {
    GET: `/app/users`,
    GETDETAIL: (id) => `/app/users/${id}`,
    EDIT: (id) => `/app/users/${id}`,
    DELETE: (id) => `/app/users/${id}`,
    UPDATE_PREMIUM: (id) => `/app/users/${id}/request_upgrade`
  },
  PRODUCT_GROUP: {
    GET: `/app/product_groups`,
    GETDETAIL: (id) => `/app/product_groups/${id}`,
    CREATE: `/app/product_groups`,
    EDIT: (id) => `/app/product_groups/${id}`,
    DELETE: (id) => `/app/product_groups/${id}`,
  },
PRODUCTS: {
    GET: `/app/products`,
    GETDETAIL: (id) => `/app/products/${id}`,
    CREATE: `/app/products`,
    EDIT: (id) => `/app/products/${id}`,
    DELETE: (id) => `/app/products/${id}`,
  }
};

