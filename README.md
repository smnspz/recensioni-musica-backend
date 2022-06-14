# express-playground

A cookiecutter template for a REST api backend built with typescript, express, prisma and pos.

## Getting Started

### Dependencies

- [Node.js](https://nodejs.org/en/download/)
- [nvm](https://github.com/nvm-sh/nvm)

### Installing

Run `git clone git@github.com:smnspz/express_playground.git` in your shell if you have ssh setup with github or just download the zip from the repository.

### Executing program

Run the following commands in your shell to get started:

```bash
# Install dependencies
npm install
# Install precommit git hooks
npm run prepare
# To run locally
npm run dev

```

Make sure you fill out the `.env.example` before running `npm run dev`, otherwise Prisma will not find the database connection string.

## Authors

Contributors names and contact info

[@smnspz](https://twitter.com/smnspz)
