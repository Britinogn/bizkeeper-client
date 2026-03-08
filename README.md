# BizKeeper Client 📒

BizKeeper is a modern digital ledger and purchase record application built for business owners to easily track bulk purchases, reorder reminders, and price histories. This is the frontend client for the BizKeeper platform, designed with a focus on ease of use, performance, and accessibility.

## 🚀 Tech Stack

- **Framework**: [Nuxt 3](https://nuxt.com/) / [Vue 3](https://vuejs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: [Shadcn Vue](https://www.shadcn-vue.com/) & Radix Vue
- **State Management**: [Pinia](https://pinia.vuejs.org/)
- **Data Fetching**: [Vue Query (@tanstack/vue-query)](https://tanstack.com/query/latest)
- **Form Validation**: [VeeValidate](https://vee-validate.logaretm.com/) & [Zod](https://zod.dev/)
- **Charting/Analytics**: [Chart.js](https://www.chartjs.org/) & [Vue-chartjs](https://vue-chartjs.org/)
- **Icons**: [Lucide Vue Next](https://lucide.dev/)
- **Date Formatting**: [Day.js](https://day.js.org/)

## ✨ Key Features

- **Authentication**: Secure login and registration flows.
- **Dashboard Overview**: Provides a high-level view of business metrics and recent activity.
- **Purchase Tracking**: Log, edit, and monitor your bulk purchases.
- **Price History**: Keep track of price fluctuations over time.
- **Reorder Reminders**: Automated reminders for when stock might be running low.
- **Analytics & Charts**: Visual data representations to help make informed business decisions.
- **Data Export**: Export your purchase and ledger data easily.
- **Settings & Profile Management**: Customizable user and business profiles.
- **Dark Mode**: Full support for both light and dark themes.

## 📂 Project Structure

- `app/components/`: Reusable UI components organized by feature (charts, modals, purchases, ui, etc.).
- `app/pages/`: Application views and routing (auth, dashboard, settings, etc.).
- `app/layouts/`: Shared visual layouts for different sections of the app.
- `app/stores/`: Pinia state management stores.
- `app/composables/`: Reusable Vue composables.
- `app/assets/`: Static assets and global CSS styles (`main.css`).
- `app/utils/`: Helper functions and utilities.
- `app/middleware/`: Route middleware for authentication and guest access control.

## 🛠️ Setup & Local Development

Make sure to install the dependencies before starting the development server.

```bash
# Install dependencies
npm install

# Start the development server on http://localhost:3000
npm run dev
```

## 📦 Build for Production

To build the application for production:

```bash
# Build the application
npm run build

# Preview the production build locally
npm run preview
```

## 🧪 Code Quality

We use TypeScript to ensure type safety across the client application. To type-check your code without building:

```bash
npm run typecheck # (if configured) or run `npx vue-tsc --noEmit`
```
