import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './layout/admin/admin.component';
import { CreateComponent } from './layout/create/create.component';
import { ProductListComponent } from './layout/product-list/product-list.component';
import { UpdateComponent } from './layout/update/update.component';
import { AdminHomeComponent } from './layout/admin-home/admin-home.component';

export const routes: Routes = [
    {path: '', component:HomeComponent},
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
        ]
    }
];
