import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'applications',
        title: 'Applications',
        translate: 'NAV.APPLICATIONS',
        type: 'group',
        icon: 'apps',
        children: [
            {
                id: 'chat',
                title: 'Hiển thị tất cả',
                translate: 'NAV.CHAT',
                type: 'item',
                icon: 'all_inbox',
                url: '/apps/chat',
                badge: {
                    title: '13',
                    bg: '#09d261',
                    fg: '#FFFFFF'
                }
            },
            {
                id: 'filter_unread',
                title: 'Lọc Chưa Đọc',
                translate: 'NAV.CHAT',
                type: 'item',
                icon: 'bookmark',
                url: '/apps/filter-unread'
            },
            {
                id: 'filter_comment',
                title: 'Lọc Bình Luận',
                translate: 'NAV.CHAT',
                type: 'item',
                icon: 'chat_buble',
                url: '/apps/filter-comment'
            },
            {
                id: 'filter_message',
                title: 'Lọc Tin Nhắn',
                translate: 'NAV.CHAT',
                type: 'item',
                icon: 'email',
                url: '/apps/filter-message'
            },
            {
                id: 'filter-vote',
                title: 'Lọc Đánh Giá',
                translate: 'NAV.CHAT',
                type: 'item',
                icon: 'star',
                url: '/apps/filter-vote'
            },
            {
                id: 'filter_phone_no_available',
                title: 'Lọc Có Số Điện Thoại',
                translate: 'NAV.CHAT',
                type: 'item',
                icon: 'phone',
                url: '/apps/filter-phone-no-available'
            },
            {
                id: 'filter_phone_no_unavailable',
                title: 'Lọc Không Có Số Điện Thoại',
                translate: 'NAV.CHAT',
                type: 'item',
                icon: 'phonelink_erase',
                url: '/apps/filter-phone-no-unavailable'
            },
            {
                id: 'filter_not_response',
                title: 'Lọc Chưa Trả Lời',
                translate: 'NAV.CHAT',
                type: 'item',
                icon: 'access_time',
                url: '/apps/filter-not-response'
            },
            {
                id: 'filter_by_time_range',
                title: 'Lọc Theo Khoảng Thời Gian',
                translate: 'NAV.CHAT',
                type: 'item',
                icon: 'calendar_today',
                url: '/apps/filter-by-time-range'
            },
            {
                id: 'filter_by_post',
                title: 'Lọc Theo Bài Viết',
                translate: 'NAV.CHAT',
                type: 'item',
                icon: 'description',
                url: '/apps/filter_by_post'
            },
            {
                id: 'filter_by_assignment',
                title: 'Lọc Theo Nhân Viên',
                translate: 'NAV.CHAT',
                type: 'item',
                icon: 'people',
                url: '/apps/filter_by_assignment'
            }
        ]
    }
];
