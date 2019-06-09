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
                id: 'dashboards',
                title: 'Dashboards',
                translate: 'NAV.DASHBOARDS',
                type: 'collapsable',
                icon: 'dashboard',
                children: [
                    {
                        id: 'analytics',
                        title: 'Analytics',
                        type: 'item',
                        url: '/apps/dashboards/analytics'
                    },
                    {
                        id: 'project',
                        title: 'Project',
                        type: 'item',
                        url: '/apps/dashboards/project'
                    }
                ]
            },
            {
                id: 'calendar',
                title: 'Calendar',
                translate: 'NAV.CALENDAR',
                type: 'item',
                icon: 'today',
                url: '/apps/calendar'
            },
            {
                id: 'e-commerce',
                title: 'E-Commerce',
                translate: 'NAV.ECOMMERCE',
                type: 'collapsable',
                icon: 'shopping_cart',
                children: [
                    {
                        id: 'products',
                        title: 'Products',
                        type: 'item',
                        url: '/apps/e-commerce/products',
                        exactMatch: true
                    },
                    {
                        id: 'productDetail',
                        title: 'Product Detail',
                        type: 'item',
                        url: '/apps/e-commerce/products/1/printed-dress',
                        exactMatch: true
                    },
                    {
                        id: 'orders',
                        title: 'Orders',
                        type: 'item',
                        url: '/apps/e-commerce/orders',
                        exactMatch: true
                    },
                    {
                        id: 'orderDetail',
                        title: 'Order Detail',
                        type: 'item',
                        url: '/apps/e-commerce/orders/1',
                        exactMatch: true
                    }
                ]
            },
            {
                id: 'chat',
                title: 'Chat',
                translate: 'NAV.CHAT',
                type: 'item',
                icon: 'chat',
                url: '/apps/chat',
                badge: {
                    title: '13',
                    bg: '#09d261',
                    fg: '#FFFFFF'
                }
            },
            {
                id: 'contacts',
                title: 'Contacts',
                translate: 'NAV.CONTACTS',
                type: 'item',
                icon: 'account_box',
                url: '/apps/contacts'
            },
            {
                id: 'to-do',
                title: 'To-Do',
                translate: 'NAV.TODO',
                type: 'item',
                icon: 'check_box',
                url: '/apps/todo',
                badge: {
                    title: '3',
                    bg: '#FF6F00',
                    fg: '#FFFFFF'
                }
            },
            {
                id: 'scrumboard',
                title: 'Scrumboard',
                translate: 'NAV.SCRUMBOARD',
                type: 'item',
                icon: 'assessment',
                url: '/apps/scrumboard'
            }
        ]
    },
    {
        id: 'pages',
        title: 'Pages',
        type: 'group',
        icon: 'pages',
        children: [
            {
                id: 'authentication',
                title: 'Authentication',
                type: 'collapsable',
                icon: 'lock',
                badge: {
                    title: '10',
                    bg: '#525e8a',
                    fg: '#FFFFFF'
                },
                children: [
                    {
                        id: 'login',
                        title: 'Login',
                        type: 'item',
                        url: '/login'
                    },
                    {
                        id: 'lock-screen',
                        title: 'Lock Screen',
                        type: 'item',
                        url: '/pages/auth/lock'
                    },
                    {
                        id: 'mail-confirmation',
                        title: 'Mail Confirmation',
                        type: 'item',
                        url: '/pages/auth/mail-confirm'
                    }
                ]
            },
            {
                id: 'coming-soon',
                title: 'Coming Soon',
                type: 'item',
                icon: 'alarm',
                url: '/pages/coming-soon'
            },
            {
                id: 'errors',
                title: 'Errors',
                type: 'collapsable',
                icon: 'error',
                children: [
                    {
                        id: '404',
                        title: '404',
                        type: 'item',
                        url: '/pages/errors/error-404'
                    },
                    {
                        id: '500',
                        title: '500',
                        type: 'item',
                        url: '/pages/errors/error-500'
                    }
                ]
            },
            {
                id: 'maintenance',
                title: 'Maintenance',
                type: 'item',
                icon: 'build',
                url: '/pages/maintenance'
            },
            {
                id: 'search',
                title: 'Search',
                type: 'collapsable',
                icon: 'search',
                children: [
                    {
                        id: 'search-classic',
                        title: 'Classic',
                        type: 'item',
                        url: '/pages/search/classic'
                    },
                    {
                        id: 'search-modern',
                        title: 'Modern',
                        type: 'item',
                        url: '/pages/search/modern'
                    }
                ]
            },
            {
                id: 'knowledge-base',
                title: 'Knowledge Base',
                type: 'item',
                icon: 'import_contacts',
                url: '/pages/knowledge-base'
            }
        ]
    }
];
