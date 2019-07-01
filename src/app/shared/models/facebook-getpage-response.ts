
    export interface Data {
        height: number;
        is_silhouette: boolean;
        url: string;
        width: number;
    }

    export interface Picture {
        data: Data;
    }

    export interface Data {
        id: string;
        name: string;
        picture: Picture;
        access_token: string;
    }

    export interface Cursors {
        before: string;
        after: string;
    }

    export interface Paging {
        cursors: Cursors;
    }

    export interface PageListResponse {
        data: Data[];
        paging: Paging;
    }
