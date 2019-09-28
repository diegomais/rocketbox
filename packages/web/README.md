# Meetapp Front-end

> “Change you and everything else will change naturally”!

In this challenge was built the front-end with ReactJS of Meetapp that use the API developed in this [repository](https://github.com/diegomais/meetapp-backend).

Created an application from scratch using create-react-app and configured linting tools, [Reactotron](https://github.com/infinitered/reactotron), [Redux](https://www.github.com/reduxjs/redux) and [Redux Saga](https://github.com/redux-saga/redux-saga).

This application is used by meetup organizers and do not have subscribing features.

The project layout is attached to assets-challenge folder in this repository.

## Pages

### Sign in

User must be able to authenticate using email and password.

### Sign up

User must be able to sign up with name, email and password.

### Dashboard

User should be able to list the meetups they organize and click to see details of a meetup.

From this page the user can navigate to meetup creation page.

### Details

User must be able to view details of a previously registered meetup.

In this page the user can edit the data of a meetup or even cancel a meetup.

### Create or edit

User must be able to create or edit information about meetups he organizes.

Display the meetup banner image preview when the user selects an image.

Use validation in the fields.

### Profile

User must be able to edit your personal data.

Use validation in the fields.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

The project can be built with npm or yarn, so choose one of the approach bellow in case you don't have any installed on your system.

* **Npm** is distributed with Node.js which means that when you download Node.js, you automatically get npm installed on your computer. [Download Node.js](https://nodejs.org/en/download/)

* **Yarn** is a package manager built by Facebook Team and seems to be faster than npm in general.  [Download Yarn](https://yarnpkg.com/en/docs/install)

### Installing

To download the project follow the instructions bellow:

Download, install dependencies and start the API server

```
1. git clone https://github.com/diegomais/meetapp-backend.git
2. cd meetapp-backend
3. yarn install
4. yarn run dev
```

Then download, install dependencies and run the project:

```
5. git clone https://github.com/diegomais/meetapp-frontend.git
6. cd meetapp-frontend
7. yarn install
8. yarn start
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
