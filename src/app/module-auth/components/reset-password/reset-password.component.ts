import { Component, Directive, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/module-auth/services/auth.service';



@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  public ResetPasswordForm: FormGroup;
  public isLoading = false;
  public isLoginFailed = false;
  public errorMessage = '';
  submitted = false;
  private routeSub: Subscription;

  private _shown = false;


  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {

    this.submitted = true;
    this.setupPasswordForm();

    this.route.queryParams.subscribe(params => {
      this.routeSub = params.token;
    });


  }


  getToken() {
    this.routeSub = this.route.queryParams.subscribe(params => {  
    });

  }





  setupPasswordForm() {
    this.ResetPasswordForm = this.fb.group({
      'password': ['', [Validators.required, Validators.minLength(6)]],
      'confirmPassword': ['', Validators.required]
    }, {
      validator: this.MustMatch('password', 'confirmPassword')
    });
  }
  get f() { return this.ResetPasswordForm.controls; }


  get password() {
    return this.ResetPasswordForm.get("password");
  }
  get confirmPassword() {
    return this.ResetPasswordForm.get("confirmPassword");
  }

  public onSubmit() {
    if (!this.ResetPasswordForm.valid) {
      console.log("error");
      return;
    }
    this.isLoading = true;
      this.authService.ResetPassword(this.routeSub, this.ResetPasswordForm.value.password).subscribe(
      data => {
        this.isLoading = false;
        this.isLoginFailed = false;
        this.router.navigate(['/home']);
      }, err => {
        this.errorMessage = err.error.message;
        this.isLoading = false;
        this.isLoginFailed = true;
      }
    )

  }

  public MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  OnClick(){
    this.router.navigateByUrl('/home');
  }



}
