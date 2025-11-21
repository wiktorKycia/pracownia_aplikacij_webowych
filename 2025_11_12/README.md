# mysql connection with prisma

The task was to set up prisma, create 3 models and make migrations.

I hosted the app and database on docker as I develop on linux and I don't want to install xampp just to run mysql.

## Structure
There are 2 containers:
1. app
    - exports a port
    - this is a simple app with no end points, since they weren't important in this task
    - is executed after database
    - implements [docker watch](https://docs.docker.com/compose/how-tos/file-watch/) in case you wanted to use the code somewhere else or use it as a template
2. database
    - uses a healthcheck, so you have to wait for a while to start it
    - requires the `.env` file, so you have to prepare it yourself or copy/rename the sample one, that I already provided

## Instructions
rename or copy `.env`:
```bash
cp .env.sample .env
```
or
```bash
mv .env.sample .env
```

containers setup:
```bash
docker compose up -d --bulid
```

prisma migrations:
```bash
docker compose exec app npx prisma migrate dev
```

the prisma setup was created according to
[prisma docs](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-node-mysql)

## Other
This subfolder is using a [project template](https://github.com/ppoz21/express-starter-cjs.git)