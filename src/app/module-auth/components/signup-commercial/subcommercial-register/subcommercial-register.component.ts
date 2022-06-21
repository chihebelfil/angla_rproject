import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/module-auth/services/auth.service';
import csc from 'country-state-city';




declare function stepper();
@Component({
  selector: 'app-subcommercial-register',
  templateUrl: './subcommercial-register.component.html',
  styleUrls: ['./subcommercial-register.component.scss']
})
export class SubcommercialRegisterComponent implements OnInit {

  public signupForm: FormGroup;
  public isLoading = false;
  public isLoginFailed = false;
  public isSignupSuccess = false;
  public isSignupFailed = false;
  public errorMessage = '';
  currentFile: File;
  public states:any[]=[];
  public countries:any[]=[];

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.setupLoginForm();
    stepper();
    this.countries = csc.getAllCountries();
    console.log('LOGGGEEDDD INN 1',this.isLoading.valueOf());
  }

  setupLoginForm() {
    this.signupForm = this.fb.group({
      'username': [null, [Validators.required]],
      'email': [null, [Validators.required]],
      'password': [null, [Validators.required]],
      'phoneNumber': [null, [Validators.required]],
      'companyName': [null, Validators.required],
      'country': [null, Validators.required],
      'city': [null, [Validators.required]],
      'zipCode': [null, [Validators.required]],
      'companyAddress': [null, [Validators.required]],
      'logo': [null, [Validators.required]],
      'nomSubCommercial': [null, [Validators.required]],
      'prenomSubCommercial': [null, [Validators.required]],



    });
  }
  get companyName() {
    return this.signupForm.get("companyName");
  } 

 get email() {
   return this.signupForm.get("email");
 }

 get phoneNumber() {
     return this.signupForm.get("phoneNumber");
   } 

 get country() {
     return this.signupForm.get("country");
   }

 get city() {
   return this.signupForm.get("city");
 }

 get zipCode() {
   return this.signupForm.get("zipCode");
 }

 get username() {
   return this.signupForm.get("username");
 }

 get password() {
   return this.signupForm.get("password");
 }

 get companyAddress() {
   return this.signupForm.get("companyAddress");
 }

 get logo() {
   return this.signupForm.get("logo");
 }
 get nomSubCommercial() {
  return this.signupForm.get("nomSubCommercial");
}
get prenomSubCommercial() {
  return this.signupForm.get("prenomSubCommercial");
}

  public errorMessages = {
    username: [
      { type: "required", message: "Username is required" },
    ],
    password: [
      { type: "required", message: "Password is required" },
    ],
    logo : [
      {type : "required", message: "Logo is required"}
    ],
    phoneNumber : [
      {type : "required", message: "phoneNumber is required"}
    ],
    companyName : [
      {type : "required", message: "companyName is required"}
    ],
    email : [
      {type : "required", message: "email is required"}
    ],
    country : [
      {type : "required", message: "Country name is required"}
    ],
    city: [
      { type: "required", message: "City is required" },
    ],
    zipCode: [
      { type: "required", message: "Zip code is required" },
    ],
    companyAddress : [
      {type : "required", message: "Company address name is required"}
    ],
    nomSubCommercial : [
      {type : "required", message: "Nom SubCommercial is required"}
    ],
    prenomSubCommercial : [
      {type : "required", message: "Prenom SubCommercial is required"}
    ],
  };


  public onSubmit() {
    console.log('signupForm=======', this.signupForm)
    if (!this.signupForm.valid) {
      console.log("error");
      return;
    }
    this.isLoading = true;
    this.authService.registerSubCommercial(this.signupForm.value, this.currentFile).subscribe(
      data => {
        this.isLoading = false;
        this.isLoginFailed = false;
        this.isSignupSuccess = true;
        this.isSignupFailed = false;
        this.router.navigate(['/home']);
      }, err => {
        this.errorMessage = err.error.message;
        this.isLoading = false;
        this.isLoginFailed = true;
        this.isSignupFailed = false;
        this.isSignupSuccess = false;
      }
    )
  }

  onChangeCountry(e:any) {
    var name :string = csc.getCountryByCode(e).name
    this.country.setValue(name, {onlySelf:true});
    this.states = csc.getStatesOfCountry(e);
    var nabeul = {name: "Nabeul Governorate", isoCode: "24", countryCode: "TN", latitude: "36.40911880", longitude: "10.14231720"}
    this.states.push(nabeul);
    console.log(this.states);
  }


  onChangeState(e){
    var x:{name:"",isoCode:""} = this.states.filter(s => s.isoCode == e).pop();
    console.log("XX==",x);
    this.city.setValue(x.name,{onlySelf:true});
}


  selectFile(event) {
    this.currentFile = event.target.files[0];
  }








}
