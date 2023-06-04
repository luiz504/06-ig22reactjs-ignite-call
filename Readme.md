# Ignite Call

The Ignite Call is a Next.js app that seamlessly integrates with the Google Calendar API, allowing users to easily schedule events within their Google Calendar.

## Development Environment Setup

### Clone the project

```bash
  git clone <projectURL>
```

### Install dependencies

```bash
  npm install
```

### Database Requirements

Setup a MySQL database locally with Docker - [Docker MySQL Documentation](https://hub.docker.com/_/mysql)

- Obtain the username, password, and port to be used in the `.env` file.

### Google Cloud Account settings (App Provider Account)

[Google APis OAuth2 Documentation](https://developers.google.com/identity/protocols/oauth2)

1. Go to the [Google API Console](https://developers.google.com/identity/protocols/oauth2) and sign in.
2. Create a project and select it.
3. Navigate to `OAuth consent screen`.  
    - Select type `External` and fill in the required fields. Save the changes.
    - Scopes => Not required (defined at a granular level during the authentication process).
    - Tests => Not required.
4. Go back to `OAuth consent screen` locate "Publishing status" and click on "Publish APP".
5. Navigate to `Credentials`.
    - Click on `Create Credentials` > `OAuth client ID` > `Web application` > continue.
    - Provide a `name` for the OAuth client ID.
    - Create an "Authorized JavaScript origins" with the value `http://localhost:3000`.
    - Create an "Authorized redirect URIs" with the value `http://localhost:3000/api/auth/callback/google`.
    - Create the client ID.
    - Once successful, **Download or Save the Credentials to use on `.env`** file.

### Environment Variables

Copy the .env.example file to .env and fill the values.

```bash
  cp .env.example .env
```

### Start the Database

```bash
  docker run <containername> -d
```

### Database Migrations

```bash
  npx prisma migrate dev
```

### Start the Application

```bash
  npm run dev
```

open [Localhost](http://localhost:3000) in your browser.

### Extra

Explore and manipulate the database using the Prisma Studio UI.

```bash
  npx prisma studio
```

open <http://localhost:5555> in your browser.
