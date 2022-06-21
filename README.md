# Example App - Angular

## Start the app

Install the dependencies and start the server.

```sh
npm install
npm start
```

The last command should open your browser and navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## abds component usage

Pre requisites:

1. Add `@abds/components` into your `package.json` as a dependency

Using a Stencil built web component collection within an Angular CLI project is a two-step process. We need to:

1. Include the `CUSTOM_ELEMENTS_SCHEMA` in the modules that use the components.
   - In this example it is used here `src/app/app.module.ts`.
2. Call `defineCustomElements()` from `main.ts` (or the project's entry point).
   - In this example it is imported in `src/main.ts` and then invoked later in that file.
   - This function is provided by Stencil's loader and it allows components to be lazy-loaded.

By importing the abds custom components above, Angular will let you use them freely throughout your project. All abds components use the `<abds-` prefix. You can see an instance of the `<abds-button>` being used in `src/app/app.component.html`.

## Additional information

For more information about the abds components that are available and their props see our [ZeroHeight documentation.](https://zeroheight.com/6af807fb0/v/latest/p/56f98e-components/b/173c7d)

For more information about integrating with Angular see [Stencil's documentation here.](https://stenciljs.com/docs/angular)

---

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.10.
