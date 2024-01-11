 **# Challenge AeroTerra ReactJs**

**This file describes how to set up and run the Aero-Terra application using Docker Compose.**

**Services**

The Docker Compose file defines two services:

**Frontend**

* **Container Name:** `frontend`
* **Build:**
    * **Context:** `./aero-terra-challenge`
    * **Dockerfile:** `Dockerfile`
* **Ports:**
    * Exposes port 5173 of the container on port 8080 of the host machine
* **Environment Variables:**
    * `REACT_APP_API_URL=http://backend:3000`: Sets the API URL for the frontend to communicate with the backend service
* **Volumes:**
    * Mounts the local `./frontend` directory to the `/app` directory inside the container
* **Command:**
    * Runs `npm run dev -- --host "0.0.0.0" --port 5173` to start the frontend development server
* **Dependencies:**
    * Depends on the `backend` service to be running

**Backend**

* **Container Name:** `backend`
* **Build:**
    * **Context:** `./backend-aero-terra`
    * **Dockerfile:** `Dockerfile`
* **Ports:**
    * Exposes port 3000 of the container on port 3000 of the host machine
* **Volumes:**
    * Mounts the local `./backend-aero-terra` directory to the `/app` directory inside the container
* **Command:**
    * Runs `npm start` to start the backend server

**Running the Application**

1. Make sure you have Docker and Docker Compose installed on your machine.
2. Open a terminal in the root directory of the project.
3. Run the following command to start the services:

   ```bash
   docker-compose up
   ```

4. Access the frontend application in your web browser at `http://localhost:8080`.

**Additional Notes**

* **Dependencies:** The `frontend` service depends on the `backend` service, so they will be started in the correct order.
* **Development Mode:** The frontend is running in development mode, so you'll need to rebuild the image and restart the container if you make changes to the frontend code.
* **Environment Variables:** You can customize the environment variables in the `docker-compose.yml` file to adjust the configuration of the services.
