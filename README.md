# Dashboar Admin with RestFulAPI

### Table of Contents

You're sections headers will be used to reference location of destination.

- [Description](#description)
- [How To Use](#how-to-use)

---

## Description

This repository for Binar Challenge Chapter 6. This chapter we learn how to use Sequelize and make a relation tabel with sequelize.

#### Technologies

- Node.js
- Express
- Sequelize 

---

## How To Use
Make sure you have install PostgreSQL and Node.Js in your computer.

#### Installation
- Clone this repository

- Install dependencies

```sh
npm install
```

- Open config/config.json and setting the database you want to use

```sh
"username": "",
"password": "",
"database": "",
"host": "127.0.0.1",
"dialect": "postgres"
```
- Create Databse

```sh
npx sequelize-cli db:create

```
- Setting database
```sh
npx sequelize-cli db:migrate

```
- Run your project

```sh
#production
npm run start

#development
npm run develop
```

- Open Browser and go to http://localhost:5000

