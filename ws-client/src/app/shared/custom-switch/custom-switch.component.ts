import { Component, EventEmitter, forwardRef, HostListener, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SwitchComponent } from '../switch/switch.component';

const UI_SWITCH_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  /* tslint:disable-next-line: no-use-before-declare */
  useExisting: forwardRef(() => SwitchComponent),
  multi: true
};

@Component({
  selector: 'app-custom-switch',
  templateUrl: './custom-switch.component.html',
  styleUrls: ['./custom-switch.component.scss'],
  providers: [UI_SWITCH_CONTROL_VALUE_ACCESSOR]
})
export class CustomSwitchComponent implements OnInit {
  ngOnInit(): void {

  }

  @Input() isSelectedTwo: boolean = true;
  @Input() titleOne = 'One';
  @Input() titleTwo = 'Two';

  @Output() switchChanged = new EventEmitter<boolean>();

  onChangedata() {
    this.isSelectedTwo = !this.isSelectedTwo;
    this.switchChanged.emit(this.isSelectedTwo);
  }

}
