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
you can use Postman or Insomnia

or

you can run requests from the [requests.http](./requests.http) file
using Webstorm