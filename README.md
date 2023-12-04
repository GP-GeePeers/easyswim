#EasySwim

[Postman](https://easyswimproject.postman.co/)


## Build and Run Docker Compose

1.  **Building the Docker Compose Configuration:**
    
    -   Open a terminal or command prompt.
    -   Navigate to the directory containing your `docker-compose.yml` file.
    -   To build the services defined in the `docker-compose.yml` file, run:
        
        
        `docker-compose build` 
        
    
    This command will build the Docker images specified in the configuration file.
    
2.  **Running the Docker Compose Configuration:**
    
    -   To start the services defined in the `docker-compose.yml` file, run:
        
        
        `docker-compose up` 
        
    
    This command will create and start containers based on the services defined in the `docker-compose.yml` file.
    
3.  **Running in Detached Mode (in the background):**
    
    -   To run containers in the background (detached mode), use the `-d` flag:
        
        
        `docker-compose up -d` 
        
    
    This will start the services in the background.
    

### Additional Commands and Actions:

-   **Stopping Services:**
    -   To stop the running services defined in the `docker-compose.yml` file, use:
        
        
        `docker-compose down` 
        
-   **Managing Services:**
    -   You can manage individual services using commands like `docker-compose stop`, `docker-compose start`, `docker-compose restart`, etc., followed by the service name.
