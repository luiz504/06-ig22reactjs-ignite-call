# Deploy instructions

To deploy your migrations to Planetscale, follow these steps:

1. Set up `.env` file:
   Update the `DATABASE_URL` with the connection URL for your Planetscale account repository.

   &nbsp;

2. Push your migrations to Planetscale branch:

   ```bash
    npx prisma db push
   ```

3. Open the Planetscale dashboard.

   &nbsp;

4. Go to Branches, create a pull request, and deploy changes to the `main` branch.

By following these steps, you will successfully deploy your migrations to Planetscale and update the Main branch with the changes.
