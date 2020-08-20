import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'

import { initialHtml } from '../track-changes-adapter/data'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  testForm: FormGroup
  private readonly licenseKey = 'ckeditor-license-key'
  private licenseValue = '1R5JdtfXfK7Ji9wfJGazaiv/BdyIK6/IoGa1g7VzQoC8czRaSJCcygo='

  ngOnInit(): void {
    window.localStorage.setItem(this.licenseKey, this.licenseValue)
    this.testForm = new FormGroup({
      testProp: new FormControl(initialHtml),
    })
  }
}
