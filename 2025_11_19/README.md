# mysql connection with prisma

## commands to run
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
docker compose -f docker-compose-db-only.yaml up -d --build
```

prisma migrations:
```bash
cd prisma
npx prisma migrate dev --name init
```

prisma generation:
```bash
cd prisma
npx prisma generate
```

the setup was created according to
[prisma docs](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-node-mysql)


## testing the API:
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