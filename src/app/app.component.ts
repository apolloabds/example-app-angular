import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

type State = {
  state_name: string;
};

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(private renderer: Renderer2) {}

  @ViewChild('modal') modal!: ElementRef<HTMLElement>;

  darkMode = false;
  isModalOpen = false;
  itemCount = 0;

  states: State[] = [
    { state_name: 'california' },
    { state_name: 'denver' },
    { state_name: 'new york' },
    { state_name: 'texas' },
  ];

  addItem = () => {
    const shoppingList = document.querySelector('.shoppingList');
    const item = document.createElement('li');

    item.innerHTML = `
      <abds-checkbox></abds-checkbox>
      <input placeholder="enter text here"/>
    `;

    shoppingList?.appendChild(item);
    this.itemCount += 1;
  };

  fetchAuthorizationToken = async () =>
    await fetch('https://www.universal-tutorial.com/api/getaccesstoken', {
      headers: new Headers({
        'api-token': 'aJC50l2lisn1j0sD7nfyZsu0npkhf6JW2YA3FcQ1244YPtONQwiiIeU0H-6kdd6kbgY',
        'user-email': 'abc.121009.210823@gmail.com',
      }),
      method: 'GET',
      redirect: 'follow',
    })
      .then((response) => response.json())
      .then(({ auth_token }) => auth_token)
      .catch((error) => console.error(error));

  fetchStates = async () => {
    const authorizationToken = await this.fetchAuthorizationToken();
    const url = 'https://www.universal-tutorial.com/api/states/United States';

    await fetch(url, {
      headers: new Headers({
        Accept: 'application/json',
        Authorization: `Bearer ${authorizationToken}`,
        'api-token': 'aJC50l2lisn1j0sD7nfyZsu0npkhf6JW2YA3FcQ1244YPtONQwiiIeU0H-6kdd6kbgY',
        'user-email': 'abc.121009.210823@gmail.com',
      }),
      method: 'GET',
      redirect: 'follow',
    })
      .then((response) => response.json())
      .then((states) => {
        this.states = states;
      })
      .catch((error) => console.error(`Failed to fetch: ${url}: ${error}`));
  };

  resetItems = () => {
    let checkboxes = document.querySelectorAll('.shoppingList abds-checkbox[checked]');

    if (checkboxes.length) {
      this.itemCount -= checkboxes.length;

      for (let item of checkboxes) {
        const liElement = item.parentElement;

        liElement?.remove();
      }
    }
  };

  setDarkMode = () => {
    this.darkMode = !this.darkMode;
  };

  toggleModal = () => {
    this.isModalOpen = !this.isModalOpen;
    this.renderer.setAttribute(this.modal.nativeElement, 'open', `${this.isModalOpen ? true : null}`);
  };

  ngOnInit() {
    this.fetchStates();
  }
}
