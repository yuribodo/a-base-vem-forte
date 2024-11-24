# Eco Food


## Table of Contents

- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Conclusion](#conclusion)

## Introduction


## Technologies Used

### Frontend

- **React**: A JavaScript library for building user interfaces. It allows us to create reusable UI components.
- **TypeScript**: A superset of JavaScript, offering static type-checking and the latest ECMAScript features.
- **TailwindCSS**: A utility-first CSS framework packed with classes like `flex`, `pt-4`, `text-center` and more to style your websites without leaving your HTML.


### Backend

- **PostgreSQL**: A powerful, open-source object-relational database system.


## Installation

Before you start, ensure you have `node` and `npm` installed on your machine. 

1. **Clone the repository**:
   
   ```bash
   git clone https://github.com/yuribodo/a-base-vem-forte.git
   ```

2. **Navigate to the repository**:

   ```bash
   cd a-base-vem-forte
   ```

3. **Install the dependencies**:

   - For Frontend:
   
     ```bash
     cd Front && npm install
     ```

   - For Backend:

     ```bash
     cd Backend && npm install
     ```

## Running the Application

- **To run the frontend**:

  ```bash
  npm run start-frontend
  ```

  This starts the Next application on `http://localhost:3000` (or another available port).

- **To run the backend**:

  ```bash
  npm run start-backend
  ```

  This initializes the server, typically on `http://localhost:3000`.

- **To run both simultaneously**:

  ```bash
  npm run start
  ```

  This will invoke `concurrently` to start both the front and back ends.

Ensure that the frontend and backend are configured to run on separate ports to avoid conflicts.

## Conclusion



---

If you find any bugs or have a feature request, please open an issue on [GitHub](https://github.com/yuribodo/a-base-vem-forte/issues).

**Made with ❤️ by **.
