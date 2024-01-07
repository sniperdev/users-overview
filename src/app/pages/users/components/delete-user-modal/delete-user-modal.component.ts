import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../../../../shared/services/user.service';

@Component({
  selector: 'app-delete-user-modal',
  templateUrl: './delete-user-modal.component.html',
  styleUrls: ['./delete-user-modal.component.scss'],
})
export class DeleteUserModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: { uuid: string },
    private userService: UserService,
  ) {}
  protected onDelete(): void {
    this.userService.deleteUser(this.data.uuid);
  }
}
