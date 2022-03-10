# About Project
This Project is using React Native Typescript as Mobile App Framework and Redux as State Management library. For App's navigation, i am using [`@react-navigation/stack`] package.

There is four pages that has been built in this project :
* Login page
* Register page
* Home Page
* Transfer Page

## Login Page
User will need to pass their `username and password` on appropriate text input field then press login.

There is two App side validation here:
```
1. check for username is empty or not
2. check for password is empty or not
```

What happened behind the scene is that this app will call provided api with username and password that provided by user. If username and password match, app will save user profile to Redux state.

To Keep the user session persist, i am using [`redux-persist`] package. What happened behind the scene is that each time redux changed, redux persist will store change into App's storage.

When user deciding to logging out, my code will clear all of user state from redux state and it will automatically send them into login page.

## Register Page
There will be three parameters that user need to pass to register page, which is `username, password, and confirmation password`. When user submitting their form for registration, app will validate user input first before hit the api. Those validations is :
```
1. Check for username is empty or not
2. Check for password is empty or not
3. Check for password confirmation is empty or not
4. Check for password and password confirmation should be equals
```
If those four validation is passed, then app will make a request to registration api with only two parameters, which is user name and password.

Because Registration API doesnt return user profile, its only return user id and token, i need to manually hit login API too with given username and password from registration page after finished hit the registration API.

So what happened behind the scene for  registration page is that it will hit Registration API, then after registration API return success response, it will hit login API. After that, app will redirect user to Home page.

With this flow, user doesn't need to go to login page after registration success. They will automatically logged in.

## Home page
When Home page loaded, app will call two APIs automatically, which is :
* check user balance
* check transaction history

These two data will be rendered on home page. For transaction history api, mobile app will need to regroup those collections into per day with the help of [`moment`] and [`lodash`] library.

There is three way user can go to Home Page:
```
1. Login success -> redirect to Homepage
2. Register success -> redirect to Homepage
3. User alredy logged in, then close the app -> Open the app -> app will automatically redirect them to Home page (persistant state)
```

## Transfer Page
This page is straight forward, when user go to this page, app will fetch payees collection from given API then populate it to payees dropdown.
There will be three available inputs which is `payees, amount, and description`.


There is no App's side validation happened here, for now this app just throw all the data to api. If the response status is not 200, it will show error message below description input for about 5 seconds and then dissapear.
If transfer is success, it will show success message for about 5 seconds too.

There is additional process hapened if transfer is success, app will re-fetch user data again, which is :
* check user balance
* check transaction history

So with logic, user will get their updated profile information without needing to reload the app again.

# Getting Started
First time to run this application is that you need to setup your environtment with common requirement to run react native on your computer.
you can see on [`https://reactnative.dev/docs/environment-setup`] to see how to run react native on your computer.

Make sure your cable is connected to your computer and ADB is authorized on your phone/emulator.

Third step is to install nodejs, make sure to install latest nodejs. This project already tested with [`NodeJS version 16.13.2`].

If those three requirements is satisfied, from this Project's root folder, run this command [`npm install`] to install required packages from package.json.

After that, what you need to do is just create [`.env`] file inside root project.

for [`.env`] file, you need to follow the referrence from [`.env.example`] and fill the required environtment vairables into those file (which is only BASE_API_URL for now).

Now all of the required steps is completed, what left is only to run this Project's App into your phone. Execute this command [`npm run android`], this will compile the app and run it to your phone.
