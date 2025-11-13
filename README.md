# OWASP Juice Shop Playwright Test Suite

**Project Automation Overview**

This repository demonstrates end-to-end automation setup on the existing OWASP Juice Shop project, which initially lacked automated test coverage. After cloning the source code, all test automation and supporting frameworks were built from scratch.

Technology Stack: Automation was implemented in Playwright (JavaScript), leveraging the latest features for fast, reliable, and cross-browser web testing.

Page Object Model (POM): UI tests are structured using the Page Object Model pattern to ensure maintainable, reusable, and easily extensible test code.

API Automation: Extensive API tests were created using Playwright’s API testing tools, providing comprehensive back-end validation across key endpoints.

Git Version Control: The entire automation codebase is managed in Git, using best practices for commits, branching, and repository organization to demonstrate robust version control skills.

CI/CD Integration: The automation framework is integrated into Azure DevOps Pipelines for continuous integration and delivery. Tests run automatically in clean environments, and results (including Playwright HTML reports and JUnit XML) are published as build artifacts.

From-Scratch Setup: No prior automation existed—every part of this setup, from dependency installation to pipeline configuration, was bootstrapped and documented to showcase the full breadth of automation engineering capability.

Dual Coverage: Both front-end (UI) and back-end (API) tests are included, ensuring true end-to-end system validation and demonstrating versatility in testing tools and strategies.

**Key Capabilities Demonstrated**

Designing and implementing UI & API test suites with Playwright JavaScript

Architecting scalable tests with Page Objects

Building automation projects from scratch into existing applications with no prior automated test coverage

Managing code effectively with Git

Creating automated pipelines in Azure DevOps, handling all test flows from install to report

Presenting clear, actionable results with Playwright’s built-in reporting and DevOps artifacts

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

project-root/
│
├── tests/
│   ├── ui/         # UI test cases (Playwright, POM)
│   └── api/        # API test cases (Playwright API)
│
├── pages/          # Page Object Model classes for UI components/pages
│
├── helpers/        # Utility scripts, shared functions, custom commands
│
├── playwright.config.js   # Playwright configuration
├── azure-pipelines.yml    # Azure DevOps pipeline definition
├── package.json           # Node.js project metadata
└── ...                   # Other standard files


## Azure Devops Pipeline
- CI/CD pipeline configuration file `azure-pipeline.yml` in the root folder


*End of README*


