import { Component, OnInit, Input } from '@angular/core';
import { PasswordServiceService } from 'src/app/services/password-service.service';
import { Params } from 'src/app/types/Params';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {
  public isChecked!: boolean;
  @Input() id!: keyof Params;


  constructor(private passwordService: PasswordServiceService) { }

  ngOnInit(): void {
    this.isChecked = this.passwordService.getParam(this.id);
  }

  setChecked(): void {
    this.isChecked = !this.isChecked;
    this.passwordService.setParam(this.id, this.isChecked);
  }
}
