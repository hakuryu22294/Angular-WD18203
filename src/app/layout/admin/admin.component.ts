import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBarComponent } from '../../components/side-bar/side-bar.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet,SideBarComponent,HeaderComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
