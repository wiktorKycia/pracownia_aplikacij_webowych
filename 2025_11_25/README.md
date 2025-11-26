# 🚀 Express.js Starter (TypeScript)

Starter repository for **ZSK students** — a lightweight, ready-to-use Express.js setup using **TypeScript**.

---

## 📦 About

This project provides a simple, clean boilerplate for building Node.js applications with **Express.js** and **TypeScript**.  
It includes configuration for **TypeScript**, **ESLint**, **Prettier**, and **Nodemon**, allowing you to start coding immediately with consistent code style and automatic restarts during development.

> **Note:** This project requires **Node.js version 22** or higher.

---

## 🧰 How to Use This Template

1. Click **"Use this template"** at the top of this repository.
2. Choose **"Create a new repository"**.
3. Fill in the repository details (name, description, visibility).
4. Clone your new repository: `git clone https://github.com/<your-username>/<your-repo>.git`
5. Install dependencies: `npm install`
6. Start developing your app 🚀

---

## ⚙️ Dependencies

### Runtime dependencies

- [`express`](https://www.npmjs.com/package/express) — Web framework for Node.js (version 4)

### Development dependencies

- [`typescript`](https://www.npmjs.com/package/typescript) — TypeScript compiler
- [`ts-node`](https://www.npmjs.com/package/ts-node) — Run TypeScript directly in Node.js
- [`@types/node`](https://www.npmjs.com/package/@types/node) — Type definitions for Node.js
- [`@types/express`](https://www.npmjs.com/package/@types/express) — Type definitions for Express
- [`eslint`](https://www.npmjs.com/package/eslint) — JavaScript/TypeScript linter
- [`typescript-eslint`](https://www.npmjs.com/package/typescript-eslint) — ESLint integration for TypeScript
- [`@eslint/js`](https://www.npmjs.com/package/@eslint/js) — ESLint base configuration
- [`@eslint/json`](https://www.npmjs.com/package/@eslint/json) — JSON linting support
- [`globals`](https://www.npmjs.com/package/globals) — Common global variables for ESLint
- [`prettier`](https://www.npmjs.com/package/prettier) — Code formatter
- [`nodemon`](https://www.npmjs.com/package/nodemon) — Automatic server restart on file changes

---

## 💻 NPM Scripts

| Command            | Description                                            |
| ------------------ | ------------------------------------------------------ |
| `npm run build`    | Compiles TypeScript files into `dist/`                 |
| `npm start`        | Runs the app using **nodemon**                         |
| `npm run format`   | Formats code using **Prettier**                        |
| `npm run lint`     | Runs **ESLint** to check for issues                    |
| `npm run lint:fix` | Runs **ESLint** and automatically fixes fixable issues |

---

## Prisma commands

```bash
cd prisma
```

Set up the tables:

```bash
npx prisma migrate dev --name init
```

Generate prisma client:

```bash
npx prisma generate
```

---

## 🧑‍🏫 Authors

Paweł Palacz ([@ppoz21](https://github.com/ppoz21)) - creator of the template

Me ([@wiktorKycia](https://github.com/wiktorKycia)) - forker, I added the docker and prisma configs

Created for educational purposes.  
Feel free to modify and expand it for your projects.

---

## 📄 License

This template is provided under the [MIT License](LICENSE).
