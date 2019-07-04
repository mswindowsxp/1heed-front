export * from './authentication.service';
import { AuthenticationService } from './authentication.service';
export * from './conversation.service';
import { ConversationService } from './conversation.service';
export * from './page.service';
import { PageService } from './page.service';
export const APIS = [AuthenticationService, ConversationService, PageService];
