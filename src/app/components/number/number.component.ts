import { Component, OnInit, Input } from '@angular/core';
import { PasswordServiceService } from 'src/app/services/password-service.service';

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.css']
})
export class NumberComponent implements OnInit {
  public readonly min: number = 1;
  public readonly max: number = 50;
  public value: number = 15;
  @Input() id!: string;

  constructor(private passwordService: PasswordServiceService) { }

  ngOnInit(): void {
  }

  private isValueInteger(): boolean {
    return !isNaN(this.value) && Number.isInteger(this.value);
  }

  public setLength(): void {
    if (!this.isValueInteger())
      return;

    if (this.value < this.min)
      this.value = this.min;

    if (this.value > this.max)
      this.value = this.max;

    this.passwordService.setLength(this.value);
  }
}
