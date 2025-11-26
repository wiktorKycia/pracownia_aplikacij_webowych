# Express connection with prisma mysql

The task add a RESTful API for models defined in the [previous task](../2025_11_12)

I hosted the app and database on docker as I develop on linux and I don't want to install xampp just to run mysql.

## Structure
There are 1 container for the database:
- uses a healthcheck, so you have to wait for a while to start it
- requires the `.env` file, so you have to prepare it yourself or copy/rename the sample one, that I already provided
  app

There is also the webserver (API), that I decided to host locally so as to have easier prisma setup.

The API server is executed via command (more about this in instructions)


## Instructions

### Environment variables (`.env` file):
In order for containers and app to work, you need to have `.env` file, but I am a programmer that follows good-practices and I do not push my `.env` files to github, so you need to crreate your own or use my sample (it should work):

```bash
cp .env.sample .env
```

### Database
I provided two compose files ( [for the whole project](docker-compose.yaml) and [for the db only](docker-compose-db-only.yaml)), nonetheless I highly recommend using the second one, since I do not guarantee that the main one will work (I simply used this command while development):

database container setup:
```bash
docker compose -f docker-compose-db-only.yaml up -d --build
```

### Prisma
I recommend you to run server and prisma locally in order to have more control in what you are doing and to avoid writing `docker compose exec` commands that are sometimes hard to write 

prisma migrations:
```bash
cd prisma
npx prisma migrate dev --name init
```

prisma generation:
```bash
npx prisma generate
```

the prisma setup was created according to
[prisma docs](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-node-mysql)

### Web server
Install the dependencies and use the predefined script from [package.json](package.json)

```bash
npm install
npm start
```


### Testing the API:
you can use tools like Postman or Insomnia

or

you can run requests from the [requests.http](./requests.http) file
using Webstorm

<details>
    <summary>How to do it?</summary>

1. Open the project in Webstorm
1. open the [requests.http](./requests.http) file
1. click on the green arrow buttons next to a http request of your choice in order to run it
1. you can also run all of them in queue by clicking the green double arrow in the top (it should have a hint: `Run All Requests in File`)

</details>