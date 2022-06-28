import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  darkMode = false;
  itemCount = 0;

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

    await fetch('https://www.universal-tutorial.com/api/states/United States', {
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
        const abdsSelect = document.querySelector('abds-select#states');

        const hiddenSelect = abdsSelect?.querySelector('select')!;
        const hiddenSelectOptions = hiddenSelect?.querySelectorAll('option') as unknown as Node[];
        const hiddenSelectPlaceholder = Array.from(hiddenSelectOptions).filter((option) =>
          (option as Element).classList.contains('placeholder')
        )[0];

        if (abdsSelect) abdsSelect.innerHTML = '';

        abdsSelect?.appendChild(hiddenSelect);

        if (hiddenSelect) hiddenSelect.innerHTML = '';

        hiddenSelect?.appendChild(hiddenSelectPlaceholder);

        states.forEach(({ state_name: state }: { state_name: string }) => {
          const option = document.createElement('option');
          const abdsOption = document.createElement('abds-select-option');

          abdsOption.innerText = state;
          abdsOption.setAttribute('value', state);

          option.innerText = state;
          option.setAttribute('value', state);

          abdsSelect?.appendChild(abdsOption);
          hiddenSelect?.appendChild(option);
        });
      })
      .catch((error) => console.error('error', error));
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
    const modalElement: HTMLAbdsModalElement | null = document.querySelector('#modal-1');
    const currentState = modalElement?.open;

    modalElement?.setAttribute('open', `${!currentState}`);
  };

  ngOnInit() {
    this.fetchStates();
  }
}
