# Restaurant Reservation

Welcome to the Restaurant Reservation! This web application allows restaurant admistrators to make reservations for their restaurants, making the process of creating reservations and seating them convenient .

## Table of Contents

- [Restaurant Reservation](#restaurant-reservation)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Demo](#demo)
  - [Features](#features)
  - [Usage](#usage)
    - [Dashboard:](#dashboard)
    - [New Reservation:](#new-reservation)
    - [New Table:](#new-table)
    - [Search:](#search)
    - [Editing Reservations:](#editing-reservations)
    - [Seating:](#seating)
  - [Installation](#installation)
  - [Dependencies](#dependencies)
  - [Contributing](#contributing)

## Introduction

The Restaurant Reservation is a web application designed to streamline the reservation process for restaurants. With this application, restaurant administrators can manage reservations, view bookings, can browse the available tables, and seat guest as they arrive.

## Demo

You can try out the live demo of the application by visiting https://restaurant-reservation-qcu6.onrender.com. Please note that this demo is a sandbox environment and may not reflect the complete features of a real-world implementation.

The backend is accessible at: https://restaurant-reservation-api-qjtm.onrender.com

## Features

The Restaurant Reservation Project comes with the following features:

- **User-friendly Interface**: The application offers an intuitive and easy-to-use interface for Restaurant Administrators.
- **Reservation Management**: Restaurant Administrators can make, modify, or cancel reservations based on table availability.
- **Real-time Availability**: The application displays real-time table availability, ensuring accurate reservation information.
- **Responsive Design**: The application is designed to work seamlessly on different devices and screen sizes.

## Usage

Access the live demo at https://restaurant-reservation-qcu6.onrender.com.

Access backend live at https://restaurant-reservation-api-qjtm.onrender.com.

#### Dashboard:

Dashboard Page offers all current reservations for that date and tables

![Dashboard](\assets\dashboard.PNG?raw=true "Dashboard")

#### New Reservation:

When provided with the required contact details to proceed with the reservation it would get inputed in the New Reservation Tab:

![New Reservation](\assets\newReservation.PNG?raw=true "New Reservation")

#### New Table:

New table page allows tables to be added, which would show in dashboard
![newTable](\assets\newTable.PNG?raw=true "newTable")

#### Search:

Allows users to search based on mobile numbers. Shows all reservations made with that phone number includes finished and cancelled.

![Search](\assets\search.PNG?raw=true "Search")

#### Editing Reservations:

After clicking edit on a reservation it would take you to edit page where you can edit anything on the reservation

![Edit](\assets\edit.PNG?raw=true "Edit")

#### Seating:

Clicking seat on a reservation allows to seat customers at a table when they arrive

![Seat](\assets\seat.PNG?raw=true "Seat")

Then dashboard shows which tables are occupied and which reservations are seated:

![occupied](\assets\occupied.PNG?raw=true "occupied")

After the table is done clicking 'Finish' promps:

![window](\assets\window.PNG?raw=true "window")

After clicking OK finishes the reservation and removes it from dashboard

## Installation

If you want to run the application locally or deploy it to your server, follow these installation steps:

1. Fork and clone this repository.
2. Run `cp ./back-end/.env.sample ./back-end/.env`.
3. Update the `./back-end/.env` file with the connection URL's to your ElephantSQL database instance.
4. Run `cp ./front-end/.env.sample ./front-end/.env`.
5. You should not need to make changes to the `./front-end/.env` file unless you want to connect to a backend at a location other than `http://localhost:5001`.
6. Run `npm install` to install project dependencies.
7. Run `npm run start:dev` to start your server in development mode.

The application should now be accessible at `http://localhost:3000` or the specified port and backend should be accessible at `http://localhost:5001` or specified port.

## Dependencies

The Restaurant Reservation Project relies on the following main dependencies:

- Frontend Framework: [React](https://react.dev/)
- Backend Framework: [Express](https://expressjs.com/)
- Database: [ElephantSQL](https://elephantsql.com/)

For a complete list of dependencies, please check the package.json file.

## Contributing

We welcome contributions to the project! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix: git checkout -b my-feature
3. Commit your changes: git commit -m "Add new feature"
4. Push the branch to your fork: git push origin my-feature
5. Submit a pull request to the main repository.

Please ensure your code follows the project's coding guidelines and includes relevant tests.
