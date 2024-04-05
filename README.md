# Blockchain-Powered Patient Management System

This system is focused on creating a Blockchain-based web application to store and manage patient data. The main aim of this project is to build a robust data managing process to ensure the accuracy and integrity of patient information, benefiting both the healthcare providers and the insurers. Also, this project is focused on employing blockchain technology to guarantee data immutability and protection against external and internal factors by creating a secure and decentralized system for storing comprehensive patient data, including medical records, prescriptions, lab reports, and more. This system will enable healthcare providers to gain valuable insights from patient data, leading to more personalized and effective patient care is another objective in this project.

The system utilizes Solidity for smart contract development on the Ethereum blockchain, while Node.js serves as the backend framework. To further enhance security, the application implements JWT (JSON Web Token) for user authentication and authorization. This multi-layered approach safeguards patient data and streamlines access control within the healthcare ecosystem

## Prerequisites

Make sure you have the following installed globally on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [Ganache](https://www.trufflesuite.com/ganache)
- [Truffle](https://www.trufflesuite.com/truffle)

## Installation

**Prerequisites:**

### Steps

1. **Install Ganache:**

   - Download and install Ganache from the official Truffle Suite website: [https://archive.trufflesuite.com/ganache/](https://archive.trufflesuite.com/ganache/)

2. **Install Truffle globally:**

   - Open your terminal or command prompt.
   - Type the following command and press Enter:

     ```bash
     npm install -g truffle@0.8.13
     ```

     **Explanation:**
     - `npm install`: This command is used by the Node Package Manager (npm) to install packages.
     - `-g`: The `-g` flag indicates that you want to install the package globally, making it accessible from any directory in your terminal.
     - `truffle@0.8.13`: This specifies the package you want to install, which is Truffle version 0.8.13. You can check the latest version using `npm info truffle@latest`.

3. **Start Ganache and Quick Start:**

   - Open Ganache.
   - Click the "Quick Start" button (if available) to create a default blockchain account and some test Ether.

4. **Modify truffle-config.js (if necessary):**

   - Locate the `truffle-config.js` file within your project directory.
   - If present, uncomment the `development` object in this file.
   - Inside the `development` object, change the `port` property to `7545` (assuming Ganache is running on that port). Here's an example:

     ```javascript
     module.exports = {
       // ... other configuration options
       networks: {
         development: {
           host: "127.0.0.1", // Replace with your Ganache host if needed
           port: 7545, // Change to Ganache's port if different
           network_id: "*", // Match any network ID
         },
       },
     };
     ```

5. **Initialize a Truffle Project (if creating a new project):**

   - If you're starting a new Truffle project, navigate to your project directory in the terminal and run:

     ```bash
     truffle init
     ```

     This will create essential Truffle project files like `truffle-config.js` and project structure.

6. **Run Migrations (if applicable):**

   - If you have existing migrations (files named `*.sol` in the `migrations` folder), run the following command to deploy them to the development network (assuming Ganache is running):

     ```bash
     truffle migrate --reset
     ```

     **Explanation:**
     - `truffle migrate`: This command executes your project's migrations.
     - `--reset`: The `--reset` option (optional) will reset the blockchain state before deploying migrations, ensuring a clean starting point.

7. **Adding admin to Database**
      - Open MongoDB Compass and connect to "PatientDataManagementSystem" MongoDB database.Navigate to the "users" collection in your database.Add below code to it.
      -  username="admin" && password="admin123" for admin

           ```
         { "_id": {
            "$oid": "651aec014ce5eb67239cf1bd"
           },
           "email": "admin@admin.com",
           "password": "$2a$10$2oXT8SwgHrW1UBxQzRX0UOqqsdjGFvinpcdrUrQ1/k/rh.EHWqCLi",
           "role": "Admin",
           "profile": {
             "$oid": "651aec014ce5eb67239cf1bd"
           }
         }
         ```

9. **Start your Node.js application:**

   - Open a terminal window and navigate to your project directory.
   - Assuming your main application file is named `app.js`, run the following command to start the Node.js server:

     ```bash
     node app.js
     ```

     This will execute the code in your `app.js` file, typically starting your Node.js application.

Remember to replace `127.0.0.1` in the `truffle-config.js` example with Ganache's host address if it's running on a different machine.




