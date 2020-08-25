import { Component, OnInit, ViewChild } from '@angular/core'

import { CloudServicesConfig } from './editor/common-interfaces'
import { NgForm } from '@angular/forms'

const LOCAL_STORAGE_KEY = 'CKEDITOR_CS_CONFIG'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild('form') form?: NgForm
  users = getUsers()
  private readonly licenseKey = 'ckeditor-license-key'
  private licenseValue = '1R5JdtfXfK7Ji9wfJGazaiv/BdyIK6/IoGa1g7VzQoC8czRaSJCcygo='

  constructor() {}

  ngOnInit(): void {
    window.localStorage.setItem(this.licenseKey, this.licenseValue)
  }
}

function getUsers(): User[] {
  return [
    {
      id: 'e1',
      name: 'Tom Rowling',
      avatar: 'https://randomuser.me/api/portraits/men/30.jpg',
      role: 'writer',
    },
    {
      id: 'e2',
      name: 'Wei Hong',
      avatar: 'https://randomuser.me/api/portraits/women/51.jpg',
      role: 'writer',
    },
    {
      id: 'e3',
      name: 'Rani Patel',
      role: 'writer',
    },
    {
      id: 'e4',
      name: 'Henrik Jensen',
      role: 'commentator',
    },
    {
      id: randomString(),
      role: 'writer',
    },
    {
      id: randomString(),
      role: 'reader',
    },
  ]
}

interface User {
  id: string
  name?: string
  avatar?: string
  role?: string
}

function randomString() {
  return Math.floor(Math.random() * Math.pow(2, 52)).toString(32)
}
