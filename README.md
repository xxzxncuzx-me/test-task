# Vehicle Make and Model Selector

This is a Next.js app where users can select a vehicle make and model year from dropdowns to view the available vehicle models.

## Features

- Select a vehicle make from a dynamically fetched list.
- Select a model year (from 2015 to the current year).
- View available vehicle models based on selected make and model year.
- Utilizes Tailwind CSS for styling.
- Data is fetched from external APIs to display vehicle information.

## Getting Started

### Prerequisites

You need to have Node.js installed on your machine. You can download it from [here](https://nodejs.org/).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/xxzxncuzx-me/test-task.git

   ```

2. Install the dependencies:

   npm install

### Running the Application

To start the development server, run:

npm run dev

This will start the server on http://localhost:3000.

Building for Production

To build the project for production, run:

npm run build

Then you can start the production server with:

npm start

### Environment Variables

Ensure you have a .env.local file in the root directory with the following variables:

NEXT_PUBLIC_API_URL=https://vpic.nhtsa.dot.gov/api/vehicles

### Linting and Formatting

    •	Run the linter with:

    npm run lint


    •	Run Prettier to format the code with:

    npm run format

### Architecture

This application is built using Next.js, Tailwind CSS for styling, and the external NHTSA API to fetch vehicle data.
• The application consists of two main pages: the home page with dropdowns for vehicle make and model year, and the results page displaying models based on the selected make and year.
• Tailwind CSS is used for styling, ensuring a clean and responsive design.
• The application uses React Suspense for handling the loading state.
