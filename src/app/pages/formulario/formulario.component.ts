import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { RouterOutlet } from '@angular/router';
import { ProductRepository } from '../../core/repositories/product.repository';
import { NavbarComponent } from '../../layouts/navbar/navbar.component';

import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environment/environment';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-formulario',
  standalone: true,
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.scss',
  imports: [
    RouterOutlet,
    NavbarComponent,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class FormularioComponent implements OnInit {
  // Isso aqui precisa pra tudo
  private http = inject(HttpClient);
  private builder = inject(NonNullableFormBuilder);

  // Http login

  login = this.builder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  // Http cadastro
  // private http = inject(HttpClient);

  form = this.builder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    document: ['', [Validators.required, this.validarDocumento.bind(this)]],
    documentType: ['', [Validators.required]],
    phone: ['', [Validators.required]],
  });

  validarDocumento(control: import('@angular/forms').AbstractControl) {
    const documentValue = control.value;
    const documentLength = documentValue.toString().length;

    if (this.form && this.form.get('documentType')) {
      const documentTypeControl = this.form.get('documentType');
      if (documentTypeControl) {
        if (documentLength === 11) {
          documentTypeControl.setValue('CPF');
        } else if (documentLength === 14) {
          documentTypeControl.setValue('CNPJ');
        } else {
          documentTypeControl.setValue('');
        }
      }
    }
  }

  async ngOnInit() {
    // console.log(this.fValue);
  }

  get f() {
    return this.form.controls;
  }
  get fValue() {
    return this.form.getRawValue();
  }

  async handleSubmit() {
    try {
      const response = await lastValueFrom(
        this.http.post(`${environment.urlApi}/users`, this.fValue)
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    console.log(this.fValue);
  }

  constructor(private authService: AuthService) {}

  onSubmit() {
    if (this.login.valid) {
      const email = this.login.value.email;
      const password = this.login.value.password;
      this.authService.signIn(email!, password!);
    }
  }

  logout() {
    this.authService.signOut();
  }
}

// export class FormularioComponent implements OnInit {
//   // Direto do Angular

//   private productRepository = inject(ProductRepository);
//   private builder = inject(NonNullableFormBuilder);
//   form = this.builder.group({
//     name: ['', [Validators.required]],
//     email: ['', [Validators.required, Validators.email]],
//     password: ['', [Validators.required]],
//     document: ['', [Validators.required]],
//     documentType: ['', [Validators.required]],
//     phone: ['', [Validators.required]],
//   });

//   async ngOnInit() {
//     console.log(this.fValue);
//     const prod = await this.productRepository.getById('');
//     this.form.patchValue(prod);
//   }

//   get f() {
//     return this.form.controls;
//   }

//   get fValue() {
//     return this.form.getRawValue();
//   }

//   async handleSubmit() {
//     try {
//       //  Para o produto
//       const { name } = this.fValue;
//       const id = await this.productRepository.add({ name });
//       console.log(id);
//     } catch (error) {
//       console.error(error);
//     }
//   }
// }

// login

//     signInWithEmailAndPassword();

//     this.productRepository;

//     // localStorage.setItem('email', JSON.stringify());
//   } catch (error) {
//     console.error(error);
//   }
//   // console.log(this.fValue);
// }
