# Nest Used Auto Pricing API
Fully functioning backend REST API allowing users to estimate how much their auto is worth based on make, model year and mileage.

Powered by Nest.js TypeScript and PostgreSQL.

## Key Features
* Backend codebase and database for an app
* API Endpoints for managing users, geting auto value estimates, reporting the estimated value of vehicles, admin functionality for approving / rejecting user submitted data
* User Authentication Service with password hashing + salting
* Nest.js Node codebase served via Docker containers

## How To Use
In order to run this application, you'll need the following:
- Git
- Docker

## Installation and Setup

```bash
# Clone the repo
$  git  clone  git@github.com:lokeam/nest-auto-value-api.git

# Navigate to the eslab directory
$  cd  nest-auto-value-api

# Build the Docker container
$  docker-compose build

# Launch the Docker container
$  docker-compose up

# Open your browser of choice, go to http://127.0.0.0.0:8000/
```