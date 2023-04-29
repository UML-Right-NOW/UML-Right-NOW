# UML Right NOW

![Logo](logo.png "Logo")

## Overview

UML Right NOW aims to be an improved, fully-automated version of the UML NOW Schedule Builder. With this web app, students are able to generate entire degree pathways in just a few clicks. By selecting a major offered by UML and optionally uploading an unofficial UML transcript, UML Right NOW will determine what course requirements have yet to be satisfied and sort these courses into one or more semesters. This renders not only Schedule Builder, but the need for academic advising appointments, obsolete. Additionally, students can create an account to save their generated degree pathways for convenient viewing in the future.

## Running
0. Ensure that Node.js is installed on the host machine
1. Execute `cd uml-right-now`
2. Execute `npm i --legacy-peer-deps`
3. If Step 2 didn't work, execute `npm i --force`
4. Execute `npm run dev`

## Compiling
1. Perform all steps within the "Running" section
2. Execute `npm run build`

## Tech Stack

### Frontend
- **Frontend Framework**: Next.js & React
- **Component Library**: MUI
- **CSS Library**: Tailwind CSS

### Backend
- **Backend Framework**: Next.js
- **Authentication Library**: NextAuth.js
- **Encryption Library**: Bcrypt.js
- **Database**: MongoDB
- **ORM**: Mongoose

### Hosting
- **Frontend & Backend**: Vercel
