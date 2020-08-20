import { Component, OnInit } from '@angular/core'

import { initialHtml } from '../track-changes-adapter/data'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  initialHtml = initialHtml
  private readonly licenseKey = 'ckeditor-license-key'
  private licenseValue = '1R5JdtfXfK7Ji9wfJGazaiv/BdyIK6/IoGa1g7VzQoC8czRaSJCcygo='

  ngOnInit(): void {
    // Save the provided license key in the local storage.
    this.licenseValue = window.localStorage.getItem(this.licenseKey)
    window.localStorage.setItem(this.licenseKey, this.licenseValue)
  }
}
