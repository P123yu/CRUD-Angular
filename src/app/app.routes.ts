import { Routes } from '@angular/router';
import { Create } from './component/create/create';
import { Home } from './component/home/home';
import { Update } from './component/update/update';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'create', component: Create },
  { path: 'update', component: Update },
  { path: '**', redirectTo: '' },


];
