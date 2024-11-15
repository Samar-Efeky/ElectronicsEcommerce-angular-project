import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, Output, EventEmitter} from '@angular/core';
import { slideInOutAnimation } from '../animations/animation';
import { AuthService } from '../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  animations:[slideInOutAnimation]
})
export class SideBarComponent implements OnChanges{
  @Input()sidebarState='out';
  @Input() islogin=false;
  @Input() categoriesList=[''];
  @Output() sidebarStateChange: EventEmitter<string> = new EventEmitter<string>();
  constructor(private _authService:AuthService){}
  ngOnChanges(){
    this.sidebarState;
    this.categoriesList;
    
  }
  closedSidebar(){
    this.sidebarState = 'out';
    this.sidebarStateChange.emit(this.sidebarState);
  }
  isLogOut(){
    this._authService.logout();
  }
}
