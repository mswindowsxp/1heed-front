export * from './authentication.service';
import { AuthenticationService } from './authentication.service';
export * from './messages.service';
import { MessagesService } from './messages.service';
export * from './page.service';
import { PageService } from './page.service';
export const APIS = [AuthenticationService, MessagesService, PageService];
