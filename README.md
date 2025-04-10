# Simple Web Server

This project is a minimal Node.js TypeScript HTTP server for receiving event data and writing it to a file.

## Features

- Accepts POST requests with a specific JSON schema at `/event`
- Writes each request to `events.jsonl`
- Health check endpoint at `/health`
- Endpoint to download the event log file at `/events`

## Getting Started

### Run with Docker

```bash
docker-compose up --build
```

### API Endpoints

- `POST /event`: Send event data
- `GET /health`: Server status
- `GET /events`: Download the event log file
