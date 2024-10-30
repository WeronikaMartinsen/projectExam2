# Holidaze Accommodation Booking App

A modern front-end application for Holidaze, an accommodation booking platform. This app enables customers to explore and book accommodations, while venue managers can manage their listings and bookings. Built with React, TypeScript, and Tailwind CSS.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [User Stories](#user-stories)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

### Customer-Facing
- View a list of available venues
- Search for a specific venue
- View details of a selected venue
- View availability on a calendar
- Register as a customer using a valid email (ending in `@stud.noroff.no`)
- Create bookings at selected venues
- View upcoming bookings

### Admin-Facing (Venue Manager)
- Register as a venue manager with a valid `@stud.noroff.no` email
- Create, update, and delete venues
- View bookings made at their venues

### Shared Features
- User authentication (login, logout)
- Update user avatar

## Tech Stack

- **Framework**: [React](https://reactjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

## Getting Started

To set up and run this project locally:

1. **Clone the repository**
   ```bash
   git clone git@github.com:WeronikaMartinsen/projectExam2.git
   cd projectExam2

2. **Install dependencies**
 ```bash
   npm install
   
3. **Set up environment variables, see Environment Variables below for details**


4. **Run the development server**
 ```bash
   npm run dev

5. **Open your browser at http://localhost:3000 to view the app.**   



## User Stories

### Customer-Facing

- A user may view a list of venues
- A user may search for a specific venue
- A user may view a specific venue page by ID
- A user may view a calendar with available dates for a venue
- A user with a `stud.noroff.no` email may register as a customer
- A registered customer may create a booking at a venue
- A registered customer may view their upcoming bookings

### Admin-Facing (Venue Manager)

- A user with a `stud.noroff.no` email may register as a venue manager
- A registered venue manager may create, update, and delete a venue
- A registered venue manager may view bookings for a venue they manage

### General

- A registered user may log in
- A registered user may update their avatar
- A registered user may log out

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch with your feature or bugfix.
3. Commit your changes and push them to your fork.
4. Open a pull request with a description of your changes.

## License

This project is distributed under the MIT License. See the `LICENSE` file for more information.
