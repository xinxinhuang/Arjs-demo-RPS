# AR.js Demo Project

This project demonstrates AR.js functionality using custom markers and 3D models.

## Prerequisites

- Node.js and npm installed
- Git Bash (for Windows users) or Terminal (for Mac/Linux users)
- A modern web browser
- A device with a camera for AR viewing

## Setup Instructions

### 1. Generate SSL Certificates

AR.js requires HTTPS to access the device camera. Generate local SSL certificates using Git Bash:

```bash
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
```

When prompted, you can press Enter for all fields since this is for local development.

### 2. Install HTTP Server

Install the http-server package globally (if not already installed):

```bash
npm install -g http-server
```

### 3. Start HTTPS Server

Run the following command in your project directory:

```bash
npx http-server -S --cors
```

This command:
- `-S`: Enables HTTPS using the SSL certificates
- `--cors`: Enables CORS for all routes

The server will start and display available URLs, typically:
- https://127.0.0.1:8080
- https://your.ip.address:8080

### 4. Access the AR Experience

1. Open the URL on your mobile device
2. Accept the self-signed certificate warning
3. Allow camera access when prompted
4. Point your camera at:
   - The custom marker for the paper model
   - The Hiro marker for the avocado model

## Troubleshooting

- If you see "Invalid Certificate" warnings, this is normal for local development. You can proceed safely.
- Make sure your device and computer are on the same network
- Some browsers may require you to enable AR features in settings

## Project Structure

```
├── index.html           # Main AR application
├── pattern-paper.patt   # Custom marker pattern
├── Avocado.glb         # 3D model
├── key.pem             # SSL private key
├── cert.pem            # SSL certificate
└── README.md           # This file
```

## Technologies Used

- [AR.js](https://ar-js-org.github.io/AR.js-Docs/) - Augmented Reality library
- [A-Frame](https://aframe.io/) - Web framework for building VR/AR experiences
- Node.js http-server - Local development server

