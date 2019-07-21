import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserInformationService {
    public pageSeleted: ObjectInfor;
    public pageSeleted$: BehaviorSubject<ObjectInfor> = new BehaviorSubject(null);
    public userInfor: ObjectInfor;
    public userInfor$: BehaviorSubject<ObjectInfor> = new BehaviorSubject(null);
    public pages: any[];
    public pages$: BehaviorSubject<any[]> = new BehaviorSubject(undefined);

    public setPageSeletedInfor({ avatarUrl, name }: ObjectInfor): void {
        this.pageSeleted = {
            avatarUrl,
            name
        };
        this.pageSeleted$.next(this.pageSeleted);
    }

    public setUserInformation(userInformation: ObjectInfor): void {
        this.userInfor = {
            avatarUrl: userInformation.avatarUrl,
            name: userInformation.name
        };
        this.userInfor$.next(this.userInfor);
    }

    public setListPage(pages: any[]): void {
        this.pages = pages;
        this.pages$.next(this.pages);
    }
}

export interface ObjectInfor {
    avatarUrl?: string;
    name?: string;
}
