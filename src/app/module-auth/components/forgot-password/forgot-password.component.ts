import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/module-auth/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {



  public forgotPasswordForm: FormGroup;
  public isLoading = false;
  public isLoginFailed = false;
  public errorMessage = '';

  display: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.setupPasswordForm();

  }

  setupPasswordForm() {
    this.forgotPasswordForm = this.fb.group({
      'email': [null, [Validators.required, Validators.email]],
    });
  }

  get email() {
    return this.forgotPasswordForm.get("email");
  }



  public onSubmit() {
   
    if (!this.forgotPasswordForm.valid) {
      console.log("error");
      return;
    }
    this.isLoading = true;
    this.authService.forgotPassword(this.forgotPasswordForm.value).subscribe(
      data => {
        this.isLoading = false;
        this.isLoginFailed = false;

        //this.router.navigate(['/abc/reset-password']);
      }, err => {
        this.errorMessage = err.error.message;
        this.isLoading = false;
        this.isLoginFailed = true;
      }

    )

  }

  showDialog() {
    this.display = true;  
  }






}
