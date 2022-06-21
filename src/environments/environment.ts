// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //authApiUrl: 'http://195.154.51.68:8082',
  //livreurApiUrl : 'http://195.154.51.68:8083',
  //colisApiUrl : 'http://195.154.51.68:8081',
  authApiUrl: 'http://localhost:8082',
  livreurApiUrl : 'http://localhost:8083',
  colisApiUrl : 'http://localhost:8081',
  secretKey: 'albouraq',
  serverImage:'https://ms-auth-yemiina.s3.eu-west-2.amazonaws.com/',
  messagingApiUrl : 'http://localhost:8096'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
