# Challenge 10. Meetapp Mobile

> “The time it takes to realize your dreams will pass anyway”!

In this challenge was built the mobile app with React Native of Meetapp that use the API developed during the challenges of the [second](https://github.com/diegomais/rocketseat-bootcamp-gostack-challenge-02-starting-backend-meetapp ) and [third](https://github.com/diegomais/rocketseat-bootcamp-gostack-challenge-03-continuing-backend-meetapp) module of Node.js.

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

The instructions are a bit different depending on your development operating system, and whether you want to start developing for iOS or Android.

You will need Node, Watchman, the React Native command line interface, and Xcode.

While you can use any editor of your choice to develop your app, you will need to install Xcode in order to set up the necessary tooling to build your React Native app for iOS.

We recommend installing Node, Watchman, and JDK using Homebrew. Run the following commands in a Terminal after installing Homebrew:

```
brew install node
brew install watchman
brew tap AdoptOpenJDK/openjdk
brew cask install adoptopenjdk8
```

If you have already installed Node on your system, make sure it is Node 8.3 or newer.

* **Npm** is distributed with Node.js which means that when you download Node.js, you automatically get npm installed on your computer. [Download Node.js](https://nodejs.org/en/download/)

* **Yarn** is a package manager built by Facebook Team and seems to be faster than npm in general.  [Download Yarn](https://yarnpkg.com/en/docs/install)

Watchman is a tool by Facebook for watching changes in the filesystem. It is highly recommended you install it for better performance.

If you have already installed JDK on your system, make sure it is JDK 8 or newer.

Node comes with npm, which lets you install the React Native command line interface. Run the following command in a Terminal:

```
npm install -g react-native-cli
```

### Installing

To download the project follow the instructions bellow.

Download, install dependencies and start the API server:

```
1. git clone https://github.com/diegomais/rocketseat-bootcamp-gostack-challenge-03-continuing-backend-meetapp.git
2. cd rocketseat-bootcamp-gostack-challenge-03-continuing-backend-meetapp
3. yarn install
4. yarn run dev
```

Then download, install dependencies and run the project:

```
5. git clone https://github.com/diegomais/rocketseat-bootcamp-gostack-challenge-10-mobile-meetapp.git
6. cd rocketseat-bootcamp-gostack-challenge-10-mobile-meetapp
7. yarn install
8. react-native run-ios
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
