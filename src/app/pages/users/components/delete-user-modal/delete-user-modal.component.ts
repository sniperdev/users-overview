import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../../../shared/interfaces/user.interface';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-delete-user-modal',
  templateUrl: './delete-user-modal.component.html',
  styleUrls: ['./delete-user-modal.component.scss'],
})
export class DeleteUserModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: { user: User; dataSource: MatTableDataSource<User> },
  ) {}
  protected onDelete(): void {
    this.data.dataSource.data = this.data.dataSource.data.filter(
      (element) => element.login.uuid !== this.data.user.login.uuid,
    );
  }
}
