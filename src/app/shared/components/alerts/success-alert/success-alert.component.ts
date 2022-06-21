import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-success-alert',
  templateUrl: './success-alert.component.html',
  styleUrls: ['./success-alert.component.scss']
})
export class SuccessAlertComponent implements OnInit {
  @Input() message : 'Success!';
  constructor() { }

  ngOnInit(): void {
  }

}
