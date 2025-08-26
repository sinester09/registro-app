import { Component ,OnInit} from '@angular/core';
import { FormBuilder, FormGroup,Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegistroService } from '../../services/registro.service';
import { Router } from '@angular/router';

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

  constructor(
    private formBuilder: FormBuilder,
    private registroService: RegistroService,
    private router: Router
  ) { }

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
    
    // Preparar datos para enviar a la API
    const userData = {
      nombre: this.registroForm.value.nombre,
      apellido: this.registroForm.value.apellido,
      dni: this.registroForm.value.dni,
      email: this.registroForm.value.email,
      telefono: this.registroForm.value.telefono,
      password: this.registroForm.value.password,
      fechaNacimiento: this.registroForm.value.fechaNacimiento,
      sexo: this.registroForm.value.sexo
    };
    
    // Llamada a la API para registrar usuario
    this.registroService.registrarUsuario(userData).subscribe({
      next: (response) => {
        console.log('Usuario registrado:', response);
        
        // Simular inicio de sesión para obtener token
        const loginData = {
          email: userData.email,
          password: userData.password
        };
        
        this.registroService.login(loginData).subscribe({
          next: (authResponse) => {
            // Guardar token en el servicio
            if (authResponse && authResponse.token) {
              this.registroService.guardarToken(authResponse.token);
              console.log('Token guardado correctamente');
            }
            
            this.registroForm.reset();
            this.submitted = false;
            alert('Usuario registrado correctamente');
            // Redirigir a otra página si es necesario
            // this.router.navigate(['/inicio']);
          },
          error: (authError) => {
            console.error('Error al iniciar sesión:', authError);
            alert('Usuario registrado pero hubo un error al iniciar sesión');
          }
        });
      },
      error: (error) => {
        console.error('Error al registrar usuario:', error);
        alert('Error al registrar usuario. Por favor, intente nuevamente.');
      }
    });
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
