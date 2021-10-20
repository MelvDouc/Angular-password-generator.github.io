import { Component, OnInit } from '@angular/core';
import { PasswordServiceService } from 'src/app/services/password-service.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  constructor(private passwordService: PasswordServiceService) { }

  ngOnInit(): void {
  }

  newPassword() {
    this.passwordService.emitPassword();
  }

  copyPassword() {
    const password = this.passwordService.getPassword();
    navigator.clipboard.writeText(password)
      .then(() => {
        this.passwordService.showCopySuccess();
      });
  }
}
