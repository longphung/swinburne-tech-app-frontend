# Project Name

## Table of Contents

1. [Getting Started](#getting-started)
2. [Environment Configuration](#environment-configuration)
3. [External Documentations](#external-documentations)

## Getting Started

1. Clone the repository
```bash
git clone <repository_url>
```
2. Install the dependencies
```bash
npm install
```
3. Copy the `.env.example` file and create a new `.env.local` file
```bash
cp .env.example .env.local
```
4. Update the `.env.local` file with your configurations
5. Start the application
```bash
npm run dev
```
## Environment Configuration

This project uses environment variables for configuration. These are stored in `.env` files. You need to set up your own versions of these files for your local environment and for production.

Here's an example of what your `.env.local` file might look like:

```dotenv
BASE_URL=/your_base_url
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
VITE_BACKEND_URL=your_backend_url
```

where:

- `BASE_URL` is the base URL of your application
- `VITE_STRIPE_PUBLIC_KEY` is your Stripe public key. **NEVER** expose your Stripe secret key here
- `VITE_BACKEND_URL` is the URL of your backend application

## External Documentations

- [React](https://react.dev/): The frontend library used in this project
- [Vite](https://vitejs.dev/): The frontend build tool used in this project
- [Refine](https://refine.dev/): Framework built on React to facilitate faster dashboards development.
- [React Query](https://tanstack.com/query/latest/docs/framework/react/overview): A library for managing, caching, synchronizing and updating server state in React applications.
- [React Hook Form](https://react-hook-form.com/): A library for managing forms in React applications.
- [Stripe Js API](https://docs.stripe.com/js): The Stripe JavaScript API for handling payments.
