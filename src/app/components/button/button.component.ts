import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input() id!: string;
  @Input() text!: string;
  @Output() clickHandler = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    this.clickHandler.emit();
  }

}
