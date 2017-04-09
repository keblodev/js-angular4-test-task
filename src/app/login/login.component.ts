import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { RemoteStateService } from '../service/remote-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public submitted: boolean;
  public events: any[] = [];

  constructor(
    public remoteState:  RemoteStateService,
    private router: Router
    ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
        login: new FormControl('user1', [<any>Validators.required, <any>Validators.minLength(5)]),
        password: new FormControl('password1', [<any>Validators.required, <any>Validators.minLength(5)])
    });
  }

  login(model: any, isValid: boolean) {
      this.submitted = true;
      if (isValid) {
        this.remoteState.loginUser(
          {
            login:    model.login,
            password: model.password
          }
        ).subscribe( (resp:any) => {
            const authToken = resp.authToken;
            const userId    = resp.userId;
            if (authToken && userId) {
              localStorage.setItem('messageAppAuthToken', authToken);
              localStorage.setItem('messageAppUserId', userId);
              this.router.navigate(['/dashboard']);
            }
        })
      }
  }
}
