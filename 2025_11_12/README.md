# mysql connection with prisma

## commands to runrename or copy `.env`:
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

the setup was created according to
[prisma docs](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-node-mysql)