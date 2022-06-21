import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/module-auth/services/auth.service';
import { environment } from 'src/environments/environment';
import csc from 'country-state-city';

declare function stepper();
@Component({
  selector: 'app-signup-carriers',
  templateUrl: './signup-carriers.component.html',
  styleUrls: ['./signup-carriers.component.scss']
})
export class SignupCarriersComponent implements OnInit {

  public signupForm: FormGroup;
  public isLoading = false;
  public isSignupFailed = false;
  public isSignupSuccess = false;
  public errorMessage = '';
  public countries:any[]=[];
  public states:any[]=[];
  public selectedCityCode: string;
  public selectedCountry:any;

  currentFile: File;
  progress = 0;
  message = '';
  imageUrl = environment.serverImage;
  fileInfos: Observable<any>;

  constructor(private fb: FormBuilder, private authService:AuthService, private router:Router) { }

  ngOnInit() {
    this.setupLoginForm();
    stepper();
    this.countries = csc.getAllCountries();
    console.log(this.countries)
  }

  ngBeforeInit(){}

  setupLoginForm() {
    this.signupForm = this.fb.group({
      'companyName': [null, Validators.required],
      'email': [null, [Validators.required]],
      'phoneNumber': [null, [Validators.required]],
      'country': [null, Validators.required],
      'city': [null, [Validators.required]],
      'zipCode': [null, [Validators.required]],
      'companyAddress': [null, [Validators.required]],
      'administratorFirstName': [null, Validators.required],
      'administratorLastName': [null, [Validators.required]],
      'administratorEmail': [null, [Validators.required]],
      'administratorPhoneNumber': [null, Validators.required],
      'username': [null, [Validators.required]],
      'password': [null, [Validators.required]],
      'logo': [null, [Validators.required]],
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
  get companyAddress() {
    return this.signupForm.get("companyAddress");
  }
  get administratorFirstName() {
    return this.signupForm.get("administratorFirstName");
  }
  get administratorLastName() {
    return this.signupForm.get("administratorLastName");
  }
  get administratorEmail() {
    return this.signupForm.get("administratorEmail");
  }
  get administratorPhoneNumber() {
    return this.signupForm.get("administratorPhoneNumber");
  }
  get username() {
    return this.signupForm.get("username");
  }
  get password() {
    return this.signupForm.get("password");
  }
  get logo() {
    return this.signupForm.get("logo");
  }

  public errorMessages = {
    username: [
      { type: "required", message: "Username is required" },
    ],
    password: [
      { type: "required", message: "Password is required" },
    ],
    companyName : [
      {type : "required", message: "Company name is required"}
    ],
    email: [
      { type: "required", message: "Email is required" },
    ],
    phoneNumber: [
      { type: "required", message: "PhoneNumber is required" },
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
    administratorFirstName: [
      { type: "required", message: "Administrator firstName is required" },
    ],
    administratorLastName: [
      { type: "required", message: "Administrator lastName is required" },
    ],
    administratorPhoneNumber: [
      { type: "required", message: "Administrator Phone number is required" },
    ],
    administratorEmail : [
      {type : "required", message: "Administrator email name is required"}
    ],
    logo : [
      {type : "required", message: "Logo is required"}
    ]
  };

  public onSubmit(){
    console.log(this.signupForm.value)
    if(!this.signupForm.valid){
      console.log("error");
      return ;
    }
      this.isLoading = true;
    this.authService.registerCarriers(this.signupForm.value, this.currentFile).subscribe(
      data => {
        console.log(data)
        this.message = data.message;
        this.isLoading = false;
        this.isSignupFailed = false;
        this.isSignupSuccess = true;
      },err => {
        console.log("error",err.error.message);
        this.isSignupFailed = true;
        this.isSignupSuccess = false;
        this.errorMessage = err.error.message;
        this.isLoading = false;
        
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
      this.city.setValue(x.name,{onlySelf:true});
  }

  selectFile(event) {
    this.currentFile = event.target.files[0];
  }

}
