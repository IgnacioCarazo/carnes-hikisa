## 📂 Folder Breakdown

### 1. `actions/`

Contains **Server Actions**. These are asynchronous functions that run on the server, used to handle form submissions and data mutations (POST, PUT, DELETE) without creating manual API routes.

### 2. `app/`

The core of the **Next.js App Router**.

- **`(auth)/` & `(main)/`**: Route Groups that organize pages logically without affecting the URL path.
- **`_components/`**: Private folders for components used strictly within a specific route, keeping them separated from the global component library.
- **`page.tsx` & `layout.tsx`**: Define the UI and shared wrappers for specific routes.

### 3. `assets/`

Storage for static files such as images, icons, and logos that are imported directly into React components.

### 4. `components/`

A library of shared, reusable UI pieces.

- **`ui/`**: Atomic components (Buttons, Inputs, Modals).
- **`common/`**: Shared structural elements like Navbars, Footers, or Sidebars.
- **`layouts/`**: Higher-order components used to wrap content in specific design patterns.

### 5. `constants/`

A central "dictionary" for immutable values. This includes static routes, API endpoints, and configuration limits to avoid "magic strings".

### 6. `hooks/`

Contains **Custom React Hooks**. This extracts reusable stateful logic (e.g., `useAuth`) so it can be shared across multiple components.

### 7. `lib/`

Dedicated to **Infrastructure and Third-party configurations**. This is where you initialize database clients, Redis instances, or utility functions.

### 8. `services/`

The **Business Logic** layer. These functions handle communication with the **backend**.

### 9. `types/`

Centralizes all **TypeScript Definitions**. It stores interfaces and types used throughout the app, ensuring data consistency and a "single source of truth".
