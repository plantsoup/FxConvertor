FxConvertor
Overview

FxConvertor is a currency conversion application that provides real-time exchange rates and supports direct currency conversions. It leverages a Cloudflare Worker to fetch and serve data from a GraphQL API, ensuring fast and efficient performance.

Features

Real-Time Exchange Rates: Access the latest currency exchange rates.

Direct Currency Conversion: Convert amounts between different currencies.

Cloudflare Worker Backend: Utilizes a Cloudflare Worker for backend operations.

GraphQL API Integration: Fetches data from a GraphQL API endpoint.

Architecture

The application is structured as follows:

Frontend: Built with React and TypeScript, providing a user-friendly interface.

Backend: A Cloudflare Worker that handles API requests and responses.

API Integration: Communicates with a GraphQL API to retrieve currency data.

Getting Started
Prerequisites

Node.js (version 16 or higher)

npm (Node Package Manager)

Installation

Clone the repository:

git clone https://github.com/plantsoup/FxConvertor.git
cd FxConvertor


Install dependencies:

npm install


Set up environment variables:

Create a .env file in the root directory and add the following:

VITE_API_URL=your_api_url
VITE_API_KEY=your_api_key


Replace your_api_url and your_api_key with your actual API URL and key.

Running Locally

To start the development server:

npm run dev


Navigate to http://localhost:3000 in your browser to view the application.

Deployment

To deploy the application:

Build the project:

npm run build


Deploy the frontend to your preferred hosting service.

Deploy the Cloudflare Worker:

Install Wrangler (Cloudflare's CLI tool):

npm install -g wrangler


Authenticate with Cloudflare:

wrangler login


Publish the Worker:

wrangler publish

Usage

Latest Rates: Access the latest exchange rates by navigating to /latest.

Currency Conversion: Convert currencies by navigating to /convert?from=USD&to=EUR&amount=100.

Contributing

Contributions are welcome! Please fork the repository, make your changes, and submit a pull request.

License

This project is licensed under the MIT License.
