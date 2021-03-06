// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  configFrireStore: {
    apiKey: 'AIzaSyBel-SbuAVQDv4bjMblOOLZtEhAslrWSMo',
    authDomain: 'improveme-81e26.firebaseapp.com',
    projectId: 'improveme-81e26',
    storageBucket: 'improveme-81e26.appspot.com',
    messagingSenderId: '240833258522',
    appId: '1:240833258522:web:54785327797461a45d5da3'
  },
  KeycloakConfig: {
    clientId: 'AdminFront',
    realm: 'improveMe',
    url: 'http://localhost:8080/auth'},
  baseUrl: 'http://improveme',
  wsServer: 'http://localhost:8085/ws'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
