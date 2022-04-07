import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  darkMode = false;
  itemCount = 0;

  addItem() {
    const shoppingList = document.querySelector('.shoppingList');
    const item = document.createElement('li');

    item.innerHTML = `
      <abds-checkbox></abds-checkbox>
      <input placeholder="enter text here"/>
    `;

    shoppingList?.appendChild(item);
    this.itemCount += 1;
  }

  resetItems() {
    let checkboxes = document.querySelectorAll('.shoppingList abds-checkbox[checked]');

    if (checkboxes.length) {
      this.itemCount -= checkboxes.length;

      for (let item of checkboxes) {
        const liElement = item.parentElement;

        liElement?.remove();
      }
    }
  }

  setDarkMode = () => {
    this.darkMode = !this.darkMode;
  };

  toggleModal() {
    const modalElement: HTMLAbdsModalElement | null = document.querySelector('#modal-1');
    const currentState = modalElement?.open;

    modalElement?.setAttribute('open', `${!currentState}`);
  }
}
