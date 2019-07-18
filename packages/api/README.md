# Challenge 03. Continuing application

During this challenge we will improve the Meetapp application that we started in the previous challenge by implementing new features.

The application we will continue development is a developer event aggregator called Meetapp (an acronym for Meetup + App).

## Features

The application we will start development from now on is a developer event aggregator called Meetapp (an acronym for Meetup + App).

In this first challenge we will create some basic functionalities that we have learned throughout the classes up to here.

## Functionalities

Below are the features we should add to our application.

### File upload

Create a file upload route that records the path and file name in a table and returns all data from the file.

### Meetups management

The user can register meetups on the platform with meetup title, description, location, date and time and image (banner). All fields are required. Also add a user_id field that stores the user ID that organizes the event.

It should not be possible to register meetups with dates that have passed.

The user should also be able to edit all meetup data that has not yet happened and that he is an organizer.

Create a route to list meetups that are organized by the logged-in user.

The user should be able to cancel meetups organized by him that have not yet happened. The delete must delete the database meetup.

## Meetups Subscription

The user must be able to subscribe for meetups that he does not organize.

User can not subscribe for meetups that have already happened.

The user can not subscribe for the same meetup twice.

The user can not join two meetups that happen at the same time.

Whenever a user signs up for the meetup, send an email to the organizer containing the data related to the registered user.

## List of meetups

Create a route to filter and list meetups by date (not by time), results from that listing should be paginated by 10 items per page. Below is an example call to the meetups listing route:

```
http://localhost:3333/meetups?date=2019-07-01&page=2
```

In this example, we will list page 2 of the meetups that will take place on July 1st.

In that list also return the organizer data.

## List of subscriptions

Create a route to list the meetups the logged-in user is enrolled in.

List only meetups that have not yet passed and order closer meetups as the first on the list.

## Submit

This challenge does not need to be submited and we will not receive a correction, but we can see the result of the challenge code here: https://github.com/Rocketseat/bootcamp-gostack-desafio-03

"Do your best, but always on time"!

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

The project can be built with npm or yarn, so choose one of the approach bellow in case you don't have any installed on your system.

* **Npm** is distributed with Node.js which means that when you download Node.js, you automatically get npm installed on your computer. [Download Node.js](https://nodejs.org/en/download/)

* **Yarn** is a package manager built by Facebook Team and seems to be faster than npm in general.  [Download Yarn](https://yarnpkg.com/en/docs/install)

### Installing

To download the project follow the instructions bellow:

```
1. git clone https://github.com/diegomais/rocketseat-bootcamp-gostack-challenge-03-continuing-backend-meetapp.git
2. cd rocketseat-bootcamp-gostack-challenge-03-continuing-backend-meetapp
```

Then install dependencies and run:

```
3. yarn install
4. yarn run dev
```

or

```
3. npm install
4. npm run dev
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
