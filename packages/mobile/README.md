# Meetapp Mobile

> “The time it takes to realize your dreams will pass anyway”!

In this challenge was built the mobile app with React Native of Meetapp that use the API developed in this [repository](https://github.com/diegomais/meetapp-backend).

Created an application from scratch using React Native CLI and configured linting tools, [Reactotron](https://github.com/infinitered/reactotron), [Redux](https://www.github.com/reduxjs/redux) and [Redux Saga](https://github.com/redux-saga/redux-saga).

This application is used by meetup subscribers and do not have meetup organization features.

This application is part of the final [bootcamp](https://rocketseat.com.br/bootcamp) challenge used for finalization and certification.

The project layout is attached to assets-challenge folder in this repository.

## Pages

### Authentication

The user must be able to authenticate using email and password.

### Register

The user must be able to register with name, email and password.

### Dashboard

User must be able to browse meetups by date.

Use infinite scroll on this page.

From this screen the user must be able to sign up for a Meetup.

### Subscriptions

The user must be able to view their meetup subscriptions.

In this screen the user can unsubscribe.

### Profile

The user must be able to edit their personal data.

Use validation in the fields.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

The project is built with React Native CLI. The instructions are a bit different depending on your operating system, and whether you want to run for iOS or Android. If you want to run on both iOS and Android, that's fine - you just have to pick one to start with, since the setup is a bit different.

**React Native CLI** is the command line tools that ship with react-native in form of the @react-native-community/cli package. [Download React Native CLI](https://facebook.github.io/react-native/docs/getting-started)

### Installing

To download the project follow the instructions bellow.

Download, install dependencies and start the API server:

```
1. git clone https://github.com/diegomais/meetapp-backend.git
2. cd meetapp-backend
3. yarn install
4. yarn run dev
```

Then download, install dependencies and run the project:

```
5. git clone https://github.com/diegomais/meetapp-mobile.git
6. cd meetapp-mobile
7. yarn install
8. react-native run-ios
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
