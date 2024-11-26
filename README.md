# Holidaze Accommodation Booking App

![Holidaze Banner](path-to-your-banner-image.jpg)

A modern front-end application for Holidaze, an accommodation booking platform. This app enables customers to explore and book accommodations, while venue managers can manage their listings and bookings. Built with **React**, **TypeScript**, and **Tailwind CSS**.

---

## Table of Contents

- [Features](#features)
  - [Customer-Facing Features](#customer-facing-features)
  - [Admin-Facing Features (Venue Manager)](#admin-facing-features-venue-manager)
  - [Shared Features](#shared-features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [User Stories](#user-stories)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

---

## Features

### Customer-Facing Features

- 🏘️ **Explore Venues**: View a list of available venues.
- 🔍 **Search Functionality**: Search for specific venues dynamically.
- 📅 **View Details**: View detailed information and availability of selected venues, including a calendar.
- 🛒 **Book Venues**: Register and book a venue with ease.
- 📝 **Manage Bookings**: View upcoming bookings in a personal dashboard.

### Admin-Facing Features (Venue Manager)

- 🏗️ **Venue Management**: Create, update, and delete venues.
- 📖 **Booking Overview**: View bookings made for venues they manage.
- 🔐 **Secure Access**: Only registered managers can access management features.

### Shared Features

- 🔑 **User Authentication**: Register, login, and logout securely.
- 🖼️ **Customizable Avatars**: Update your avatar for personalization.

---

## Tech Stack

- **Framework**: [React](https://reactjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Routing**: [React Router](https://reactrouter.com/)

---

## Getting Started

### Clone the Repository

```bash
git clone git@github.com:WeronikaMartinsen/projectExam2.git
cd projectExam2
```

### Install Dependencies

```bash
npm install
```

### Set Up Environment Variables

REACT_APP_API_URL=<Your_API_URL>
REACT_APP_GOOGLE_MAPS_API_KEY=<Your_Google_Maps_API_Key>

### Run the Development Server

```bash
npm run dev
```

### Open your browser and navigate to http://localhost:3000 to view the application.

## User Stories

### Customer-Facing

- As a user, I can view a list of venues.
- As a user, I can search for a specific venue.
- As a user, I can view details of a venue, including its availability on a calendar.
- As a user with a `@stud.noroff.no` email, I can register as a customer.
- As a registered customer, I can book a venue.
- As a registered customer, I can view my upcoming bookings.

### Admin-Facing (Venue Manager)

- As a user with a `@stud.noroff.no` email, I can register as a venue manager.
- As a registered venue manager, I can create, update, and delete venues.
- As a registered venue manager, I can view bookings made for my venues.

### General

- As a registered user, I can log in and out securely.
- As a registered user, I can update my avatar.

## Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**.

2. **Create a new branch** for your feature or bugfix:

```bash
   git checkout -b feature-name
```

3. **Commit your changes and push them to your fork:**

```bash
git commit -m "Description of feature/bugfix"
git push origin feature-name

```

## Live Demo

Check out the live application: [Holidaze Accommodation Booking App](https://holidaze-martinsen.netlify.app/)

## Contact

For any questions or feedback, feel free to reach out:

- **Email**: [your-email@example.com](weronika.martinsen@gmail.com)
