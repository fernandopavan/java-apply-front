import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { ListUserComponent } from './user/list-user/list-user.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { EditUserResolver } from './user/edit-user/edit-user.resolver';
import { ChatComponent } from './chat/chat.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'login', component: LoginComponent, canActivate: [AppComponent],
    runGuardsAndResolvers: 'always'
  },
  { path: 'add-user', component: AddUserComponent },
  { path: 'list-user', component: ListUserComponent },
  { path: 'edit-user/:id', component: EditUserComponent, resolve: { data: EditUserResolver } },
  { path: 'chat', component: ChatComponent }
];

export const routing = RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' });
