export const UPDATE_USER_INFOR = '[USER] Update infomation and pages manage';
export class UpdateUserInfor implements Action {
    readonly type = UPDATE_USER_INFOR;
    constructor(payload: any) {}
}

export type Action = UpdateUserInfor;
