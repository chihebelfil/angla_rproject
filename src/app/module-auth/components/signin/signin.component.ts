import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  isLoginFailed = false;
  errorMessage = '';
  isLoading = false;

  public signinForm: FormGroup;

  constructor(private authService: AuthService,
    private tokenStorage: TokenStorageService, private fb: FormBuilder,
    private router:Router) { }

  ngOnInit(): void {
    this.setupLoginForm();
    this.tokenStorage.getToken();
    this.tokenStorage.getUser();
  }

  setupLoginForm() {
    this.signinForm = this.fb.group({
      'username': [null, Validators.required],
      'password': [null, [Validators.required]]
    });
  }

  get username() {
    return this.signinForm.get("username");
  }
  get password() {
    return this.signinForm.get("password");
  }

  public errorMessages = {
    username: [
      { type: "required", message: "Username is required" },
    ],
    password: [
      { type: "required", message: "Password is required" },
    ]
  };

  onClick(){
    this.router.navigate(['/home']);
  }


  onSubmit(form): void {
    if(!this.signinForm.valid)
      return ;
    this.isLoading = true;
    this.authService.login(this.signinForm.value).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoading = false;
        this.isLoginFailed = false;
        this.router.navigate(['home'])
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoading = false;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

}
