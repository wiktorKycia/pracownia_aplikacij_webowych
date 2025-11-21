# Express + Mysql + Docker

The task was to create a server, that would:
- serve static files (html, css, jpg)
- handle a form
- connect with the mysql and save messages into the database
- hangle get requests on `/api/` endpoints and return messages from db

I hosted the app and database on docker as I develop on linux and I don't want to install xampp just to run mysql.

There are 2 containers:
1. app 
   - exports a port
   - is executed after database
   - implements [docker watch](https://docs.docker.com/compose/how-tos/file-watch/)
2. database
   - uses a healthcheck, so you have to wait for a while to start it
   - requires the `.env` file, so you have to prepare it yourself or copy/rename the sample one, that I already provided

## Instruction
Run this command in your shell to see my work (you might want to change some values in .env file, but it is not necessary)
```bash
cd 2025_11_05
cp .env.sample .env
docker compose up
```

If you want to also develop, this command would be helpful
```bash
docker compose up --watch
```

Restart everything
```bash
docker compose down -v && docker compose up --build
```