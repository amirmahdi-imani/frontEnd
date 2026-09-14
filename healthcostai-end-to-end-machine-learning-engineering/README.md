# HealthCost AI — Frontend

Production-ready frontend for **HealthCost AI**, an end-to-end machine learning application for medical insurance cost prediction.

Built with Next.js and connected to a deployed FastAPI backend for real-time machine learning inference.

## Live Demo

**Web Application**

https://healthcostai-end-to-end-machine-lea-pi.vercel.app/

**Backend API**

https://datascience-mf6o.onrender.com

**API Documentation**

https://datascience-mf6o.onrender.com/docs

---

## Overview

This repository contains the frontend application of HealthCost AI.

The application provides a clean web interface where users can enter patient information and receive a predicted medical insurance charge from the deployed machine learning model.

```text
User
  ↓
Next.js Frontend
  ↓
FastAPI API
  ↓
Machine Learning Pipeline
  ↓
Prediction
```

---

## Features

* Medical cost prediction form
* Real-time API integration
* Loading and error states
* Prediction result visualization
* Responsive design
* Light / Dark mode
* Client-side form handling
* Type-safe API communication
* Production deployment on Vercel

---

## Pages

```text
/
├── Home
├── /predict
└── /about
```

### Home

Introduces the HealthCost AI project and provides access to the prediction application.

### Predict

Allows users to enter the six model features:

* Age
* Sex
* BMI
* Children
* Smoker
* Region

The form sends the data to the FastAPI backend and displays the predicted medical charges.

### About

Provides a technical overview of the project architecture, machine learning pipeline, API, technologies, and deployment.

---

## Tech Stack

### Framework

* Next.js 16
* React
* TypeScript

### UI

* Tailwind CSS v4
* shadcn/ui
* Lucide React
* next-themes

### Deployment

* Vercel

### Backend Integration

* FastAPI
* REST API
* JSON

---

## Project Structure

```text
src/
├── app/
│   ├── about/
│   │   └── page.tsx
│   ├── predict/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── prediction/
│   │   ├── PredictionForm.tsx
│   │   └── PredictionResult.tsx
│   ├── ui/
│   ├── Navbar.tsx
│   └── theme-provider.tsx
│
├── config/
│   └── env.ts
│
├── lib/
│   ├── api.ts
│   └── utils.ts
│
└── types/
    └── prediction.ts

public/
```

---

## API Integration

The frontend communicates with the deployed FastAPI backend through an environment variable.

### Production

```env
NEXT_PUBLIC_API_URL=https://datascience-mf6o.onrender.com
```

### Local Development

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

The API client sends prediction requests to:

```text
POST /predict
```

Example request:

```json
{
  "age": 30,
  "sex": "male",
  "bmi": 28.5,
  "children": 2,
  "smoker": "no",
  "region": "southwest"
}
```

Example response:

```json
{
  "predicted_charges": 0000.00
}
```

---

## Getting Started

### Requirements

* Node.js
* npm

### Installation

Clone the repository and install dependencies:

```bash
npm install
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

### Development

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

### Production Build

```bash
npm run build
```

Run the production application:

```bash
npm start
```

---

## Deployment

The frontend is deployed on **Vercel** and automatically built from the GitHub repository.

```text
GitHub
   ↓
Vercel
   ↓
Next.js
   ↓
FastAPI on Render
```

Live application:

https://healthcostai-end-to-end-machine-lea-pi.vercel.app/

---

## Design

The interface follows a compact technical dashboard style with:

* Responsive layouts
* Consistent spacing and typography
* Blue-based visual system
* Light and dark themes
* Accessible UI components
* Clear loading, success, and error states

---

## Related Backend

The backend and machine learning components are maintained separately.

**Backend API:**

https://datascience-mf6o.onrender.com

**Main Project Repository:**

https://github.com/amirmahdi-imani/DataScience

---

## License

This project is developed as an educational and portfolio project.

---

## Author

**Amir Imani**

Machine Learning / Data Science / ML Engineering

GitHub:

https://github.com/amirmahdi-imani
