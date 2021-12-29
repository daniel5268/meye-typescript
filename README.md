<br/>
<p align="center">
  <h3 align="center">Meye Digital Assistant Backend</h3>

  <p align="center">
    Typescript
    <br/>
    <br/>
    <a href="https://github.com/daniel5268/meye-typescript"><strong>Explore the docs »</strong></a>
    <br/>
    <br/>
    <a href="https://github.com/daniel5268/meye-typescript/issues">Report Bug</a>
    .
    <a href="https://github.com/daniel5268/meye-typescript/issues">Request Feature</a>
  </p>
</p>

![Downloads](https://img.shields.io/github/downloads/daniel5268/meye-typescript/total) ![Contributors](https://img.shields.io/github/contributors/daniel5268/meye-typescript?color=dark-green) ![Issues](https://img.shields.io/github/issues/daniel5268/meye-typescript) ![License](https://img.shields.io/github/license/daniel5268/meye-typescript) 

## Table Of Contents

* [About the Project](#about-the-project)
* [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Contributing](#contributing)
* [License](#license)
* [Authors](#authors)
* [Acknowledgements](#acknowledgements)

## About The Project

This project is meant to provide a restful interface to access to the database that contains the users and their pjs information.
* It allows a regular user to sign up, sign in, create pjs, check pjs info and spend experience given by the master user
* It allows a master user to sign in and assign xp

## Built With

* Typescript
* ExpressJS
* Postgres (Sequelize)

## Getting Started

The project contains two main folders

* scr
This folder contains the server typescript code and it's divided by sub folders (modules)

* * api, contains the express server and the routing config

* * handler, contains the methods that receive the http request, validate the incoming data and maps it to our domain before calling the service, this module should have a file per entity (user.ts, pj.ts, xp_assignations.ts)

* * service, contains the methods that receive the previously validated http data mapped to domain data, retrieves database information when needed (using the repository module) and uses domain business logic to perform the different operations.


* * repository, contains the methods that allow the database queries (CRUD operations to postgres) and return domain models.

* * domain, should include all the models, constants, business logic and should be separated from the different layers that are related to http or database connection.

* * infrastructure, contains the dependencies and info related to infrastructure (postgres connection, logger, http port, etc)
 
### Prerequisites

* npm >= 8.3.0
* node >= v16.13.1
* postgreSQL >= 12.9


### Installation

1. npm i

### Testing

1. npm run test

## Contributing

Any contributions you make are **greatly appreciated**.
* If you have suggestions for adding or removing projects, feel free to [open an issue](https://github.com/daniel5268/meye-typescript/issues/new) to discuss it, or directly create a pull request after you edit the *README.md* file with necessary changes.
* Please make sure you check your spelling and grammar.
* Create individual PR for each suggestion.
* Please also read through the [Code Of Conduct](https://github.com/daniel5268/meye-typescript/blob/main/CODE_OF_CONDUCT.md) before posting your first idea as well.

### Creating A Pull Request

1. Fork the Project
2. Part from development (`git checkout development`)
3. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
4. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the Branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

## Authors

* **Daniel Tamayo** - *Backend developer* - [Daniel Alejandro Tamayo Echeverri](https://github.com/daniel5268/) 
