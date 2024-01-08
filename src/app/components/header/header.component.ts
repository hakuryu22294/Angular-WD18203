import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  menuList = [
    {
      label:'Home',
      link:'#'
    },
    {
      label:'Company',
      link:'#'
    },
    {
      label:'About',
      link:'#'
    },
   ]
}
