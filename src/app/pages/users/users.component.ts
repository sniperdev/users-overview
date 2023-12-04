import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUserModalComponent } from './components/add-user-modal/add-user-modal.component';
import { AddUserModalData } from './components/add-user-modal/interfaces/add-user-modal-data.interface';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  protected users$ = this.userService.users$;

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
  ) {}

  protected addSingleUser(): void {
    this.dialog.open(AddUserModalComponent, {
      data: { mode: 'single' } as AddUserModalData,
      width: '400px',
    });
  }

  protected addMultipleUsers(): void {
    this.dialog.open(AddUserModalComponent, {
      data: { mode: 'multiple' } as AddUserModalData,
      width: '400px',
    });
  }
}
