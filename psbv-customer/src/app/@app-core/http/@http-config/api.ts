import { InjectionToken } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

export const API_URL = new InjectionToken<string>('apiUrl');

export const APICONFIG = {
  BASEPOINT: environment.apiUrl,
  AUTH: {
    LOGIN: '/app/auth/login',
    SIGNUP: `/app/auth/signup`,
    TYPE_OF_USER: `/app/auth/users/profile`,
    RESET_PASSWORD_EMAIL: `/app/reset_password/send_code`,
    CHECK_CODE_RESET: `/app/reset_password/check_code`,
    RESET_PASSWORD: `/app/reset_password/reset_password`,

  },
  ACCOUNT: {
    PROFILE_USER: `/app/users/profile`,
    UPDATE_NAME: `/app/users/update_profile`,
    UPDATE_PASS: `/app/users/update_password`,
    GETDETAIL: (id) => `/app/users/${id}`,
    EDIT: (id) => `/app/users/${id}`,
    DELETE: (id) => `/app/users/${id}`,
    UPDATE_PREMIUM: (id) => `/app/users/request_upgrade`,
    CONTACT_ADMIN: `/app/interact_email/submit`
  },
  PRODUCT_GROUP: {
    GET: `/app/product_groups`,
    SEARCH: (search_term) => `/app/product_groups?name=${search_term}`,
    GETDETAIL: (id) => `/app/product_groups/${id}`,
    CREATE: `/app/product_groups`,
    EDIT: (id) => `/app/product_groups/${id}`,
    DELETE: (id) => `/app/product_groups/${id}`,
  },
  PRODUCTS: {
    GET: `/app/products`,
    GET_TRENDING: `/app/products/trending`,
    SEARCH: (name) => `/app/products?name=${name}`,
    GETDETAIL: (id) => `/app/products/${id}`,
    CREATE: `/app/products`,
    EDIT: (id) => `/app/products/${id}`,
    DELETE: (id) => `/app/products/${id}`,
  },
  ACCESSORIES: {
    GET: `/app/accessories`,
    GET_WITH_PRODUCT_ID: (id) => `/app/products/${id}/accessories`,
    GET_DETAIL: (id) => `/app/accessories/${id}`,
    CREATE: '/app/accessories',
    EDIT: (id) => `/app/accessories${id}`,
    DELETE: (id) => `/app/accessories${id}`
  },
  ORDERS: {
    GET: `/app/orders`,
    GET_DETAIL: (id) => `/app/orders/${id}`,
    GET_HISTORY: `/app/history`,
    CREATE: '/app/orders',
    EDIT: (id) => `/app/orders${id}`,
    DELETE: (id) => `/app/orders${id}`
  }
};

