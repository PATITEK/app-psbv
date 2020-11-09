import { InjectionToken } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

export const API_URL = new InjectionToken<string>('apiUrl');

export const APICONFIG = {
  BASEPOINT: environment.apiUrl,
  AUTH: {
    LOGIN: '/app/auth/login'
  },
  ACCOUNT: {
    GET: `/app/users`,
    GETDETAIL: (id) => `/app/users/${id}`,
    EDIT: (id) => `/app/users/${id}`,
    DELETE: (id) => `/app/users/${id}`,
  },
  PRODUCT_GROUP: {
    GET: `/app/product_groups/list_group`,
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
  },
  PROMOTIONS: {
    GET: `/app/promotions`,
    GETDETAIL: (id) => `/app/promotions/${id}`,
    CREATE: `/app/promotions`,
    EDIT: (id) => `/app/promotions/${id}`,
    DELETE: (id) => `/app/promotions/${id}`,
  },
  ORDER: {
    GET: `/app/orders`,
    GETDETAIL: (id) => `/app/orders/${id}`,
    EDIT: (id) => `/app/orders/${id}`,
  },
  BOOKING: {
    GET: `/app/bookings`,
    GETDETAIL: (id) => `/app/bookings/${id}`,
    EDIT: (id) => `/app/bookings/${id}`,
    GET_SERVICE_LIST: `app/bookings/service_list`,
    GET_TYPE_LIST: `app/bookings/book_type_list`
  },
  SERVICE_TYPE: {
    GET: `/app/service_types`,
    GETDETAIL: (id) => `/app/service_types/${id}`,
    CREATE: `/app/promotions`,
    EDIT: (id) => `/app/service_types/${id}`,
    DELETE: (id) => `/app/service_types/${id}`,
  },
  COMBO_BOOKING: {
    GET: `/app/combo_bookings`,
    GETDETAIL: (id) => `/app/combo_bookings/${id}`,
    CREATE: `/app/combo_bookings`,
    EDIT: (id) => `/app/combo_bookings/${id}`,
    DELETE: (id) => `/app/combo_bookings/${id}`,
  }
};

