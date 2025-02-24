# Event Booking System

The Event Booking System is a React-based web application that allows users to book event slots, manage cancellations, and maintain a waiting list. It supports multiple events and ensures data persistence using localStorage.

### Features

- Add new events dynamically

- Book slots for each event independently

- Cancel bookings and manage a waiting list per event

- Clear all events using the reset button

- Error handling for fully booked events with an option to join the waiting list

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (>=16.0.0)

- npm

### Creating the Project with React + TypeScript + Vite

1. Install Vite and create the project:

```js
npm create vite@latest event-booking-system
```

2. Navigate to the project directory:

```js
cd event-booking-system
```

3. Install dependencies:

```js
npm install
```

### Running the Application

To start the development server:

```js
npm run dev
```

The application will be available at http://localhost:5173

## Environment Variable Configuration

Create a `.env` file in the root directory and configure the following:

```js
REACT_APP_TOTAL_SLOTS = 10;
LOCAL_STORAGE_KEY = eventBookingState;
```

## State Management Approach

The application uses React Context API for global state management. The `BookingProvider` component manages event data, including:

- Available slots

- Confirmed bookings

- Waiting list

- Persistent storage using localStorage

## Custom Hooks

A custom hook `useBooking()` provides access to booking-related actions, ensuring a modular and scalable approach.
