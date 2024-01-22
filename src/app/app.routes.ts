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

export const routes: Routes = [
    {path: '', component:HomeComponent,
        children:[
            {
                path:'login', component:LoginComponent
            },
            {
                path:'register', component:RegisterComponent
            }
        ]},
    {path:'admin', component:AdminComponent,
        children:[
            {
                path:'', component:AdminHomeComponent
            },
            {
                path:'all-products', component:ProductListComponent
            },
            {
                path:'create', component:CreateComponent
            },
            {
                path:'update/:id', component:UpdateComponent
            }
        ],
        canActivate:[adminGuard]
        
    },
    {path:'error', component:ErrorPageComponent}
];
