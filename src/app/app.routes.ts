import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './layout/admin/admin.component';
import { CreateComponent } from './layout/create/create.component';
import { ProductListComponent } from './layout/product-list/product-list.component';
import { UpdateComponent } from './layout/update/update.component';
import { AdminHomeComponent } from './layout/admin-home/admin-home.component';
import { LoginComponent } from './layout/user/login/login.component';
import { RegisterComponent } from './layout/user/register/register.component';
import { adminGuard } from './guards/admin.guard';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { CateListComponent } from './layout/categoty/cate-list/cate-list.component';
import { CreateCateComponent } from './layout/categoty/create-cate/create-cate.component';
import { UpdateCateComponent } from './layout/categoty/update-cate/update-cate.component';
import { UserListComponent } from './layout/user/user-list/user-list.component';
import { UpdateInfoComponent } from './layout/user/update-info/update-info.component';
import { BlankComponent } from './components/blank/blank.component';
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'user/:id',
        component: BlankComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'user-info/:id',
        component: UpdateInfoComponent,
      },
    ],
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: AdminHomeComponent,
      },
      {
        path: 'all-products',
        component: ProductListComponent,
        children: [
          {
            path: '?filter',
            component: ProductListComponent,
          },
          {
            path: '?seach',
            component: ProductListComponent,
          },
        ],
      },
      {
        path: 'create',
        component: CreateComponent,
      },
      {
        path: 'update/:id',
        component: UpdateComponent,
      },
      {
        path: 'all-category',
        component: CateListComponent,
      },
      {
        path: 'create-category',
        component: CreateCateComponent,
      },
      {
        path: 'update-category/:id',
        component: UpdateCateComponent,
      },
      {
        path: 'all-users',
        component: UserListComponent,
      },
    ],
    canActivate: [adminGuard],
  },
  { path: 'error', component: ErrorPageComponent },
];
