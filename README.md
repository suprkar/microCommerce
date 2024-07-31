# microCommerce

microCommerce is a microservices-based e-commerce platform leveraging modern DevOps tools and practices for efficient development, deployment, and scaling.

## Table of Contents
1. [Technologies Used](#technologies-used)
2. [Docker](#docker)
3. [Jenkins](#jenkins)
4. [Kubernetes](#kubernetes)
5. [Project Structure](#project-structure)
6. [Setup and Installation](#setup-and-installation)
7. [Contributing](#contributing)
8. [License](#license)

## Technologies Used

This project utilizes several key technologies in the DevOps ecosystem:

- Docker
- Jenkins
- Kubernetes

## Docker

### What is Docker?

Docker is a platform for developing, shipping, and running applications in containers. Containers are lightweight, standalone, executable packages that include everything needed to run a piece of software, including the code, runtime, system tools, libraries, and settings.

### How Docker is used in microCommerce

In this project, Docker is used to containerize each microservice. This ensures:

1. Consistency across development, testing, and production environments.
2. Isolation of services, reducing conflicts between different parts of the application.
3. Easy scaling and deployment of individual services.

Docker files for each service can be found in their respective directories.

## Jenkins

### What is Jenkins?

Jenkins is an open-source automation server that helps automate parts of software development related to building, testing, and deploying, facilitating continuous integration and continuous delivery (CI/CD).

### How Jenkins is used in microCommerce

In this project, Jenkins is used for:

1. Automating the build process for each microservice.
2. Running automated tests to ensure code quality.
3. Creating Docker images for each service after successful builds.
4. Pushing these images to a Docker registry.
5. Triggering deployments to the Kubernetes cluster.

The Jenkins configuration can be found in the `Jenkinsfile` at the root of the repository.

## Kubernetes

### What is Kubernetes?

Kubernetes is an open-source container orchestration platform. It automates the deployment, scaling, and management of containerized applications.

### How Kubernetes is used in microCommerce

In this project, Kubernetes is used for:

1. Deploying the containerized microservices.
2. Managing the scaling of services based on load.
3. Ensuring high availability of the application.
4. Managing network communication between services.
5. Handling rolling updates and rollbacks of services.

Kubernetes configuration files can be found in the `k8s` directory.

## Project Structure
microCommerce/
├── services/
│   ├── product-service/
│   ├── order-service/
│   ├── user-service/
│   └── ...
├── k8s/
│   ├── product-deployment.yaml
│   ├── order-deployment.yaml
│   ├── user-deployment.yaml
│   └── ...
├── Jenkinsfile
└── README.md

## Setup and Installation
### Prerequisites
- Node.js and npm
- Docker
- Kubernetes cluster (minikube for local development)
- kubectl command-line tool

### Local Development

1. Clone the repository:
```
git clone https://github.com/suprkar/microCommerce.git
cd microCommerce
```
2. Install dependencies for each service:

```
cd services/product-service
npm install
cd ../order-service
npm install
cd ../user-service
npm install
```
3. Run each service locally:
   ```npm start```

### Docker Setup

1. Build Docker images for each service:
```
docker build -t product-service:/product-service
docker build -t order-service:/order-service
docker build -t user-service:/user-service
```
2. Run Docker containers:
```
docker run -d -p 3000:3000 product-service:latest
docker run -d -p 3001:3001 order-service:latest
docker run -d -p 3002:3002 user-service:latest
```
### Kubernetes Deployment

1. Apply Kubernetes configurations:
```
kubectl apply -f k8s/product-deployment.yaml
kubectl apply -f k8s/order-deployment.yaml
kubectl apply -f k8s/user-deployment.yaml
```
2. Check the status of the pods:
```
kubectl get pods
```
3. Access the services:
```
kubectl port-forward service/product-service 3000:3000
kubectl port-forward service/order-service 3001:3001
kubectl port-forward service/user-service 3002:3002
```
### Accessing the Application

Once all services are running, you can access them at:
- Product Service: http://localhost:3000
- Order Service: http://localhost:3001
- User Service: http://localhost:3002

Note: The actual endpoints and ports may vary based on your specific configuration.

### Continuous Integration/Deployment

The project uses Jenkins for CI/CD. The Jenkinsfile in the root directory defines the pipeline:

1. Code is pushed to the repository
2. Jenkins triggers a new build
3. Services are built and tested
4. Docker images are created and pushed to a registry
5. Kubernetes deployments are updated with the new images

For detailed Jenkins setup, please refer to your Jenkins server configuration.

