# Fresh Boilerplate with TailwindCSS and Turso

This repository provides a boilerplate for building web applications using Deno's Fresh framework, TailwindCSS for styling, and Turso for database management.

## Features

- [Fresh](https://fresh.deno.dev/): A next-generation web framework for Deno
- [TailwindCSS](https://tailwindcss.com/): A utility-first CSS framework
- [Turso](https://turso.tech/): An edge-hosted relational database

## Prerequisites

- [Deno](https://deno.land/) installed on your machine
- [Turso CLI](https://docs.turso.tech/reference/turso-cli) installed for database management

## Getting Started

1. Clone this repository:
   ```
   git clone https://github.com/hirefrank/fresh-tailwind-turso-boilerplate.git
   cd fresh-tailwind-turso-boilerplate
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up your Turso database:
   ```
   turso db create my-app-db
   turso db tokens create my-app-db
   ```

4. Create a `.env` file in the root directory and add the following environment variables:
   ```
   TURSO_DATABASE_URL=libsql://your-database-url.turso.io
   TURSO_AUTH_TOKEN=your-auth-token
   ANTHROPIC_API_KEY=your-anthropic-api-key
   PROD=false
   BASELIME_API_KEY=your-baselime-api-key
   OPENAI_API_KEY=your-openai-api-key
   SITE_URL=http://localhost:8000
   ```
   Note: Make sure to replace the placeholder values with your actual credentials and settings.

5. Start the development server:
   ```
   deno task start
   ```

6. Open your browser and visit `http://localhost:8000`

## Project Structure

- `routes/`: Contains all the routes for your application
- `islands/`: Contains interactive components
- `components/`: Contains reusable UI components
- `static/`: Contains static assets
- `tailwind.config.ts`: TailwindCSS configuration
- `src/core/config.ts`: Configuration file for environment variables

## Customization

### TailwindCSS

The TailwindCSS configuration is located in `tailwind.config.ts`. You can extend or modify the theme, add plugins, or customize variants as needed.

### Database

Turso database operations can be performed in your routes or islands. Use the `@libsql/client` package to interact with your Turso database.

### Environment Variables

The application uses several environment variables for configuration. These are defined in `src/core/config.ts`. Make sure to set all required variables in your `.env` file or in your deployment environment.

## Deployment

This boilerplate is ready to be deployed on Deno Deploy. Make sure to set up your environment variables in the Deno Deploy dashboard, including:

- `TURSO_DATABASE_URL`
- `TURSO_AUTH_TOKEN`
- `ANTHROPIC_API_KEY`
- `PROD` (set to `true` for production)
- `BASELIME_API_KEY`
- `OPENAI_API_KEY`
- `SITE_URL`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

