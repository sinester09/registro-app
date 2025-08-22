import { Component ,OnInit} from '@angular/core';
import { FormBuilder, FormGroup,Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro implements OnInit {
  registroForm!: FormGroup;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registroForm = this.formBuilder.group({
      nombre: ['',[Validators.required,Validators.minLength(4)]],
      apellido: ['',[Validators.required,Validators.minLength(4)]],
      dni: ['',[Validators.required,Validators.pattern('^[0-9]{8}$')]],
      email: ['',[Validators.required,Validators.email]],
      telefono: ['',[Validators.required,Validators.pattern('^[0-9]{9}$')]],
      password: ['',[Validators.required,Validators.minLength(8)]],
      confirmPassword: ['',[Validators.required]],
      fechaNacimiento: ['',[Validators.required]],
      sexo: ['',[Validators.required]],
      terminos: [false,Validators.requiredTrue]
    },{
      validators: this.passwordMatchValidator
    }); 
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      form.get('confirmPassword')?.setErrors(null);
    }
  }

  get f() { return this.registroForm.controls; }
  
 hasError(fieldName: string, errorType: string): boolean {
    return !!this.registroForm.get(fieldName)?.hasError(errorType) &&
           (this.registroForm.get(fieldName)?.dirty || this.submitted);
  }

  onSubmit() {
    this.submitted = true;
    if (this.registroForm.invalid) {
      return;
    }
    console.log(this.registroForm.value);
    this.registroForm.reset();
    this.submitted = false;
    alert('formulario enviado correctamente');
  }

  onReset() {
    this.submitted = false;
    this.registroForm.reset();
  }
  
  onlyNumbers(event: KeyboardEvent): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    }
    return true;
  }
}
