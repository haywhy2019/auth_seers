# **LafiaEMR Authentication Module**

## **Introduction**

The **LafiaEMR Authentication Module** is a core Frontend component of the LafiaEMR SaaS application designed to manage Electronic Medical Records (EMR) for hospitals. This module handles user authentication, including login, registration, password recovery, and user role management. Built with **Next.js**, **Carbon Design System for React**, and **Yarn**, it ensures a seamless and secure authentication process for healthcare professionals and administrators.

---

## **Features**

- **Secure Authentication**: Provides secure login and registration flows using modern encryption practices.
- **Role-Based Access Control (RBAC)**: Manages access based on user roles (e.g., Admin, Doctor, Nurse, etc.).
- **Password Recovery**: Enables users to reset forgotten passwords securely.
- **Responsive Design**: Fully responsive UI built with the **Carbon Design System**.
- **Multi-Tenant Support**: Authentication tailored for hospitals with multi-tenant configurations.

---

## **Tech Stack**

- **Frontend Framework**: [Next.js](https://nextjs.org/)
- **UI Components**: [Carbon Design System for React](https://react.carbondesignsystem.com/)
- **Package Manager**: [Yarn](https://yarnpkg.com/)

---

## **Installation**

To get started, clone the repository and install the dependencies.

### **Clone the Repository**

````bash
git clone https://github.com/LafiaEMR/lafiacore-esm-auth-onboard.git
cd lafiacore-esm-auth-onboard

 **Install dependencies:**

   ```bash
   yarn install
````

### **Set up environment variables:**

Create a `.env.local` file in the root directory and add the following variables:

```plaintext
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

Adjust the values to match your API URL.

4. **Run the development server:**

   ```bash
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

## Configuration

The application relies on several environment variables to connect to databases and services. Below are key configurations:

- `NEXT_PUBLIC_BASEURL`: URL for API requests from the frontend.

## Scripts

- **`yarn dev`**: Runs the application in development mode.
- **`yarn build`**: Builds the application for production.
- **`yarn start`**: Starts the production build.
- **`yarn lint`**: Runs linter checks on the code.
- **`yarn format`**: Formats code according to project standards.

## Folder Structure

```plaintext
├── public              # Public assets (images, icons, etc.)
├── src
│   ├── components      # Reusable UI components
│   ├── apps           # Next.js pages
│   ├── styles          # Tailwind CSS configuration
│   ├── helpers           # Utility functions and helpers
└── README.md
```

## Contributing

To contribute to this Repo, please follow these steps:

1. Clone the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.
