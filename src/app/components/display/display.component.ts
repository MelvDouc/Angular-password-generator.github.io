import { Component, OnInit } from '@angular/core';
import { PasswordServiceService } from 'src/app/services/password-service.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  public password!: string;
  public hideSuccess: boolean = true;

  constructor(private passwordService: PasswordServiceService) { }

  ngOnInit(): void {
    this.password = this.passwordService.generatePassword();
    this.passwordService.passwordSubject.subscribe(value => {
      this.password = value;
    });
    this.passwordService.copySuccessSubject.subscribe(value => {
      this.hideSuccess = !value;
      setTimeout(() => {
        this.hideSuccess = true;
      }, 1000);
    });
  }
}
