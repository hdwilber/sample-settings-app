# Sample Application with inputs
This is a sample application created by using `create-react-app`.
The built/bundled static files for the application can be fount at: [Sample Application](https://hdwilber.github.io/index.html)

## Description 
This sample will show different kind of inputs as a sample and demonstrative application
The application allows the user to log in to the application. If bad credentials are passed, the application responds with an error message. If everything goes fine, it goes to a Settings page. It allows also to save session locally, this is intended to restore the session every time that the user closes the tab window or make a hard refresh to the page.

In order to get logged in successfully: the credentials are: 
```
{
	email: wil@tx.com,
	password: asdf,
}
```
The settings page is a demonstrative page that the logged user can fill, save, reset and clear all the fields that the form is displaying.

When the user saves its configuration, and after all fields were validated, the application will store it in the local storage. And It will be retrieved when the user logs in, again. 
If the user clicks in `reset`, the application will restore the fields to the current saved state of its configuration.
When the user clicks in `clear`, the application will remove all fields from local storage and if the user enters again. The fields will be empty.
When the user clicks in `logout`, the locally stored session is removed.

At the left side of the settings component, there is an image uploader that receives `png or jpg` images. That image is stored in base64 format and saved as text in the local Storage when the user clicks in `save`.

At the bottom of the right side, there is a `github` field. It is just a field that gets verified if the account exists by requesting to `https://api.github.com/users/[name]`. It is not a good implementation, it only verifies when a key is pressed in the field.

The validations are performed with `react-final-form` library that have been merged with `react-semantic-ui` components.

## Redux store, actions and reducers
It has been configurated the store to work with the application. Also, `redux-thunk` has been set as a middleware in order to allow asynchronous responses.

In order to follow an asynchronous behaviour, almost all the actions have been called in a callback for a setTimeout funcion. 
Those are only for demonstration purposes.

Two state have been set:
- App. It only handles the loading state for the application that it is being showed at the beginning of the application
- Account:  It will store a loading state, an email, an error and a loggedIn varialbe to check if the user has successfully logged in.


### Redux: App
It has  a simple action that is `startApp` and checks for the difference beetween a startTime when the application has been mounted and loading end time, when the application has requested some resources in order to start successfully.

### Redux: Account
It has the action for `login`, `logout`, `restore`, `restoreSettigs`, `saveSettings`


## Development
To start the development server: `npm run start`
## Production
To run production scripts: `npm run build`

The libraries used to build this application are:
- ReactJs
- Redux
- Semantic UI
- React Final Form

