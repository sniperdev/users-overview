import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddUserModalData } from './interfaces/add-user-modal-data.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NATIONALITIES } from '../../../../shared/data/nationalities.data';
import { Nationality } from '../../../../shared/interfaces/nationality.interface';
import { UserService } from '../../../../shared/services/user.service';
import { UsersParams } from '../../../../shared/interfaces/users-params.interface';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.scss'],
})
export class AddUserModalComponent implements OnInit {
  protected formGroup!: FormGroup;
  protected isLoadingUsers$ = this.userService.isLoadingUsers$;

  get isSingleMode(): boolean {
    return this.data.mode === 'single';
  }

  get titleText(): string {
    return this.isSingleMode ? 'Add single' : 'Add multiple';
  }

  get nationalities(): Nationality[] {
    return NATIONALITIES;
  }

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) protected data: AddUserModalData,
  ) {}

  ngOnInit() {
    this.formGroup = this.createForm();
  }

  protected onSubmit(): void {
    const params: UsersParams = {
      gender: this.formGroup.controls['gender'].value,
      nationality: this.formGroup.controls['nationality'].value,
      amount: this.formGroup.controls['amount'].value,
    };
    this.userService.addUsers(params).subscribe((users) => {
      this.dialogRef.close(users);
    });
  }

  protected getNationalityFlag(nationality: string): string {
    return `https://flagcdn.com/16x12/${nationality}.png`;
  }

  private createForm(): FormGroup {
    return this.fb.group({
      amount: [1, [Validators.required, Validators.min(1)]],
      gender: [{ value: '', disabled: !this.isSingleMode }],
      nationality: [{ value: '', disabled: !this.isSingleMode }],
      isRandGender: [true],
      isRandNationality: [true],
    });
  }
}
