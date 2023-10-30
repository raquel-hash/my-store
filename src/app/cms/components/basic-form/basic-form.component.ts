import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss'],
})
export class BasicFormComponent {
  nameField = new FormControl('', [
    Validators.required,
    Validators.maxLength(10),
  ]);
  emailField = new FormControl('');
  phoneField = new FormControl('');
  colorField = new FormControl('#000000');
  dateField = new FormControl('');
  ageField = new FormControl('12');
  categoryField = new FormControl('Category-2');

  tagField = new FormControl('');

  agreeField = new FormControl();

  genderField = new FormControl();

  zoneField = new FormControl();

  ngOnInit() {
    this.nameField.valueChanges.subscribe((value) => {
      console.log(value);
    });
  }

  getNameValue() {
    console.log(this.nameField.value);
  }
}
