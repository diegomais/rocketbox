<h1 align="center">
    <img alt="RocketBox" src="assets/logo.svg" width="250px" /><br>
    <b>Everything you need, all in one place, instantly</b> 📦
</h1>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/diegomais/rocketbox?style=for-the-badge">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/diegomais/rocketbox?style=for-the-badge">
  <img alt="GitHub license" src="https://img.shields.io/github/license/diegomais/rocketbox?style=for-the-badge">
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/diegomais/rocketbox?style=for-the-badge">
</p>

<p align="center">
  <a href="#rocket-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#computer-project">Project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#seat-getting-started">Getting started</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#thinking-how-to-contribute">How to contribute</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-license">License</a>
</p>

<br>

## :rocket: Technologies

This project was developed with the following technologies:

- [Node.js](https://nodejs.org)
- [ReactJS](https://reactjs.org)
- [React Native](https://reactnative.dev)

Extras:

- Main Libs
  - [Express](https://expressjs.com)
  - [Next.js](https://nextjs.org)
  - [Mongoose ODM](https://mongoosejs.com)
  - [socket.io](https://socket.io)

## :computer: Project

RocketBox is a project where you can store your files, accessible from your computer or phone, just add your files and instantly display the content in other devices.

## :seat: Getting started

These instructions will get you a copy of the full project up and running on your local machine for development and testing purposes.

### API and Web App

#### Setting up the development environment

You will need to install [Git](https://git-scm.com/downloads), [Docker Desktop](https://www.docker.com/products/docker-desktop) and [Docker Compose](https://docs.docker.com/compose/install/) before following the instructions below.

#### Building and running the services using Docker Compose

The following steps need to be performed inside a terminal window (Windows user may prefer to use the [Windows Terminal](https://aka.ms/windowsterminal) but the Command Prompt will also work).

Clone the repository and build Docker images:

1. `$ git clone https://github.com/diegomais/rocketbox.git`
2. `$ cd rocketbox`
3. `$ docker-compose build`
4. `$ docker-compose up`

You can now use the API at [http://localhost:3333](http://localhost:3333) and view the Web App in the browser at [http://localhost:3000](http://localhost:3000).

### Mobile App

#### Setting up the development environment

Follow the instructions for React Native CLI available in the official [React Native Documentation](https://reactnative.dev/docs/environment-setup).

#### Installing dependencies and running the Mobile App

Run the instructions bellow inside `packages/mobile` directory:

1. `npm install`
2. `npm start`

or

1. `yarn install`
2. `yarn start`

## :thinking: How to contribute

- Fork this repository;
- Create a branch with your feature: `git checkout -b my-feature`;
- Commit your changes: `git commit -m '[feat](scope) My new feature'`;
- Push to your branch: `git push origin my-feature`.

After the merge of your pull request is done, you can delete your branch.

## :memo: License

This project is under the MIT license. See the [LICENSE](LICENSE) for more details.

---

Made with :heart: by [Diego Mais](https://diegomais.tk) :wave:.
