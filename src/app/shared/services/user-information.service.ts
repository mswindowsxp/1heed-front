import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserInformationService {
    public userInfor: UserInfor;
    public userInfor$: BehaviorSubject<UserInfor> = new BehaviorSubject(null);

    public setUserInformation(avatarUrl: string, name: string): void {
        this.userInfor = {
            avatarUrl,
            name
        };
        this.userInfor$.next(this.userInfor);
    }
}

export interface UserInfor {
    avatarUrl?: string;
    name?: string;
}
