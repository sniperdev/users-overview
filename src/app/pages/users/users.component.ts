import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUserModalComponent } from './components/add-user-modal/add-user-modal.component';
import { AddUserModalData } from './components/add-user-modal/interfaces/add-user-modal-data.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  constructor(private dialog: MatDialog) {}

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
