import { InMemoryDbService } from 'angular-in-memory-web-api';
import { CalendarFakeDb } from 'app/fake-db/calendar';
import { ChatFakeDb } from 'app/fake-db/chat';
import { ChatPanelFakeDb } from 'app/fake-db/chat-panel';
import { ContactsFakeDb } from 'app/fake-db/contacts';
import { AnalyticsDashboardDb } from 'app/fake-db/dashboard-analytics';
import { ProjectDashboardDb } from 'app/fake-db/dashboard-project';
import { ECommerceFakeDb } from 'app/fake-db/e-commerce';
import { IconsFakeDb } from 'app/fake-db/icons';
import { KnowledgeBaseFakeDb } from 'app/fake-db/knowledge-base';
import { MailFakeDb } from 'app/fake-db/mail';
import { ProfileFakeDb } from 'app/fake-db/profile';
import { QuickPanelFakeDb } from 'app/fake-db/quick-panel';
import { ScrumboardFakeDb } from 'app/fake-db/scrumboard';
import { SearchFakeDb } from 'app/fake-db/search';
import { TodoFakeDb } from 'app/fake-db/todo';

export class FakeDbService implements InMemoryDbService {
    createDb(): any {
        return {
            // Dashboards
            'project-dashboard-projects': ProjectDashboardDb.projects,
            'project-dashboard-widgets': ProjectDashboardDb.widgets,
            'analytics-dashboard-widgets': AnalyticsDashboardDb.widgets,

            // Calendar
            calendar: CalendarFakeDb.data,

            // E-Commerce
            'e-commerce-products': ECommerceFakeDb.products,
            'e-commerce-orders': ECommerceFakeDb.orders,

            // Mail
            'mail-mails': MailFakeDb.mails,
            'mail-folders': MailFakeDb.folders,
            'mail-filters': MailFakeDb.filters,
            'mail-labels': MailFakeDb.labels,

            // Chat
            'chat-contacts': ChatFakeDb.contacts,
            'chat-chats': ChatFakeDb.chats,
            'chat-user': ChatFakeDb.user,

            // Contacts
            'contacts-contacts': ContactsFakeDb.contacts,
            'contacts-user': ContactsFakeDb.user,

            // Todo
            'todo-todos': TodoFakeDb.todos,
            'todo-filters': TodoFakeDb.filters,
            'todo-tags': TodoFakeDb.tags,

            // Scrumboard
            'scrumboard-boards': ScrumboardFakeDb.boards,

            // Profile
            'profile-timeline': ProfileFakeDb.timeline,
            'profile-photos-videos': ProfileFakeDb.photosVideos,
            'profile-about': ProfileFakeDb.about,

            // Search
            search: SearchFakeDb.search,

            // Knowledge base
            'knowledge-base': KnowledgeBaseFakeDb.data,

            // Icons
            icons: IconsFakeDb.icons,

            // Chat Panel
            'chat-panel-contacts': ChatPanelFakeDb.contacts,
            'chat-panel-chats': ChatPanelFakeDb.chats,
            'chat-panel-user': ChatPanelFakeDb.user,

            // Quick Panel
            'quick-panel-notes': QuickPanelFakeDb.notes,
            'quick-panel-events': QuickPanelFakeDb.events
        };
    }
}
