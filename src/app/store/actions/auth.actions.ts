import { Action } from "@ngrx/store";


export interface AuthUser {
    name: string;
    id: number;
    email: string;
    role: string;
};

export enum AuthTypes {
    GET = 'GET_AUTH'
}

export class GetCurrent implements Action {
    readonly type = AuthTypes.GET;

    constructor(public payload: AuthUser){}
}

export type AuthAction = GetCurrent;