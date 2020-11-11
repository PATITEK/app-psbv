import { IPageRequest } from '../global';

export interface IAccount {
    username?: string;
    password?: string;
}

export interface IGetAccounts {
    data: IAccount[];
}

export interface Role {
    valueView: string;
    value: any;
}

export interface IPageAccount extends IPageRequest {
    role?: string;
}