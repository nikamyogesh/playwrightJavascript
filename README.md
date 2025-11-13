# OWASP Juice Shop Playwright Test Suite

This repository contains automated UI & API tests for the [OWASP Juice Shop](https://github.com/juice-shop/juice-shop)

The test suite leverages **Playwright (JavaScript)** and covers key user journeys plus API endpoints for robust end-to-end testing.

---

## Setup and Run Instructions

**Prerequisites:**
- Node.js (20.x LTS or above recommended)
- npm (included with Node.js)
- Git

### 1. Clone the Repositories

- git clone https://github.com/nikamyogesh/playwrightJavascript


### 2. Install Test Dependencies andStart Juice Shop Application

- cd playwright-javascript
- npm install
- npx playwright install --with-deps
- npm start
- Browse to http://localhost:3000

- By default, the app will be running at http://localhost:3000


### 3.  To Run the Tests use below commands

- npx playwright test
- npx playwright test --headed



- Run the command for test result summaries - 
  - npx playwright show-report 

---

## Project Overview

- **UI tests:** Simulate real customer journeys (login, browse products, add-to-basket, checkout), including negative case.
- **API tests:** Cover core REST endpoints for authentication, product listing, Add product to basket, place order and negative scenario (e.g. Unauthorized).

## Azure Devops Pipeline
- CI/CD pipeline configuration file `azure-pipeline.yml` in the root folder


*End of README*


