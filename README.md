# Techaway

## Table of Contents

1. [Getting Started](#getting-started)
2. [Environment Configuration](#environment-configuration)
3. [External Documentations](#external-documentations)
4. [Frequently Asked Questions (FAQs)](#faq)

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
VITE_BASE_URL=/your_base_url
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
VITE_BACKEND_URL=your_backend_url
```

where:

-   `VITE_BASE_URL` is the base URL of your application
-   `VITE_STRIPE_PUBLIC_KEY` is your Stripe public key, it should start with `pk_<key>` format. **NEVER** expose your Stripe secret key here
-   `VITE_BACKEND_URL` is the URL of your backend application

## External Documentations

-   [React](https://react.dev/): The frontend library used in this project
-   [Vite](https://vitejs.dev/): The frontend build tool used in this project
-   [Refine](https://refine.dev/): Framework built on React to facilitate faster dashboards development.
-   [React Query](https://tanstack.com/query/latest/docs/framework/react/overview): A library for managing, caching, synchronizing and updating server state in React applications.
-   [React Hook Form](https://react-hook-form.com/): A library for managing forms in React applications.
-   [Stripe Js API](https://docs.stripe.com/js): The Stripe JavaScript API for handling payments.

## FAQ

### How can I test Stripe?

Stripe provides a set of test accounts on their website which can be found [here](https://docs.stripe.com/testing#cards). Depending on the Stripe credentials you provide Stripe will determine your account will be in test mode or not. While in test mode, it is important to never input real credit cards information.

### The order invoice pdf blanks out when navigating away from the page or to different tab?

This is a known issue currently happening with Chromium browsers and affect not only `react-pdf` library. Tracking issue specific to `react-pdf` can be found [here](https://github.com/wojtekmaj/react-pdf/issues/1798). Issues have been resolved on my local machine but other web users are still having similar report.

### My Cypress tests are returning 404 and not really running?

If you are using the cypress runner to check instead of running in headless mode, then pick Electron instead of Google Chrome. Electron is the environment we are using to run the cypress tests in headless mode, which is what will also be running in the pipeline when we integrate tests to the pipeline.
