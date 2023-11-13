import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AddUserModalData} from "./interfaces/add-user-modal-data.interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.scss']
})
export class AddUserModalComponent implements OnInit{
  protected formGroup: FormGroup = this.createForm();

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) protected data: AddUserModalData,
  ) {}

  ngOnInit() {
  }

  protected onSubmit(): void {}

  private createForm(): FormGroup {
    return this.fb.group({
      amount: ["",[Validators.required]],
      gender: [""],
      nationality: [""],
      isRandGender: [true],
      isRandNationality: [true],
    })
  }
}
