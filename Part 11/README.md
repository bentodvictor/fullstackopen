# Full Stack Open - Part 11

## CI/CD

> Helsinki University - Full Stack Open Course Part 11

# 11.1 Warming up

Think about a hypothetical situation where we have an application being worked on by a team of about 6 people. The application is in active development and will be released soon.

Let us assume that the application is coded with some other language than JavaScript/TypeScript, e.g. in Python, Java, or Ruby. You can freely pick the language. This might even be a language you do not know much yourself.

Write a short text, say 200-300 words, where you answer or discuss some of the points below. You can check the length with https://wordcounter.net/. Save your answer to the file named exercise1.md in the root of the repository that you shall create in exercise 11.2.

The points to discuss:

- Some common steps in a CI setup include linting, testing, and building. What are the specific tools for taking care of these steps in the ecosystem of the language you picked? You can search for the answers by Google.
- What alternatives are there to set up the CI besides Jenkins and GitHub Actions? Again, you can ask Google!
- Would this setup be better in a self-hosted or a cloud-based environment? Why? What information would you need to make that decision?

Remember that there are no 'right' answers to the above!

# Exercise 11.2.

In most exercises of this part, we are building a CI/CD pipeline for a small project found in this example project repository.

## 11.2 The example project

The first thing you'll want to do is to fork the example repository under your name. What it essentially does is it creates a copy of the repository under your GitHub user profile for your use.

To fork the repository, you can click on the Fork button in the top-right area of the repository view next to the Star button:

Once you've clicked on the Fork button, GitHub will start the creation of a new repository called {github_username}/full-stack-open-pokedex.

Once the process has been finished, you should be redirected to your brand-new repository:

Clone the project now to your machine. As always, when starting with a new code, the most obvious place to look first is the file package.json

> NOTE since the project is already a bit old, you need Node 16 to work with it!

Try now the following:

- install dependencies (by running `npm install`)
- start the code in development mode
- run tests
- lint the code

You might notice that the project contains some broken tests and linting errors. Just leave them as they are for now. We will get around those later in the exercises.

> NOTE the tests of the project have been made with Jest. The course material in part 5 uses Vitest. From the usage point of view, the libraries have barely any difference.

As you might remember from part 3, the React code should not be run in development mode once it is deployed in production. Try now the following

- create a production build of the project
- run the production version locally

Also for these two tasks, there are ready-made npm scripts in the project!

Study the structure of the project for a while. As you notice both the frontend and the backend code are now in the same repository. In earlier parts of the course we had a separate repository for both, but having those in the same repository makes things much simpler when setting up a CI environment.

In contrast to most projects in this course, the frontend code does not use Vite but it has a relatively simple Webpack configuration that takes care of creating the development environment and creating the production bundle.

# Exercises 11.5.-11.9.

## 11.5 Linting workflow

Implement or copy-paste the "Lint" workflow and commit it to the repository. Use a new yml file for this workflow, you may call it e.g. pipeline.yml.

Push your code and navigate to "Actions" tab and click on your newly created workflow on the left. You should see that the workflow run has failed:

## 11.6 Fix the code

There are some issues with the code that you will need to fix. Open up the workflow logs and investigate what is wrong.

A couple of hints. One of the errors is best to be fixed by specifying proper env for linting, see here how it can be done . One of the complaints concerning console.log statement could be taken care of by simply silencing the rule for that specific line. Ask google how to do it.

Make the necessary changes to the source code so that the lint workflow passes. Once you commit new code the workflow will run again and you will see updated output where all is green again:

## 11.7 Building and testing

Let's expand on the previous workflow that currently does the linting of the code. Edit the workflow and similarly to the lint command add commands for build and test.

## 11.8 Back to green

Investigate which test fails and fix the issue in the code (do not change the tests).

Once you have fixed all the issues and the Pokedex is bug-free, the workflow run will succeed and show green!

## 11.9 Simple end-to-end tests

The current set of tests uses Jest to ensure that the React components work as intended. This is essentially the same thing that is done in the section Testing React apps of part 5 with Vitest.

Testing components in isolation is quite useful but that still does not ensure that the system as a whole works as we wish. To have more confidence about this, let us write a couple of really simple end-to-end tests similarly we did in section part 5. You could use Playwright or Cypress for the tests.

No matter which you choose, you should extend Jest-definition in package.json to prevent Jest from trying to run the e2e-tests. Assuming that directory e2e-tests is used for e2e-tests, the definition is:

```json
{
  // ...
  "jest": {
    "testEnvironment": "jsdom",
    "testPathIgnorePatterns": ["e2e-tests"]
  }
}
```

### Playwright

Set Playwright up (you'll find here all the info you need) to your repository. Note that in contrast to part 5, you should now install Playwright to the same project with the rest of the code!

Use this test first:

```javascript
const { test, describe, expect, beforeEach } = require("@playwright/test");

describe("Pokedex", () => {
  test("front page can be opened", async ({ page }) => {
    await page.goto("");
    await expect(page.getByText("ivysaur")).toBeVisible();
    await expect(
      page.getByText(
        "Pokémon and Pokémon character names are trademarks of Nintendo."
      )
    ).toBeVisible();
  });
});
```

Note is that although the page renders the Pokemon names with an initial capital letter, the names are actually written with lowercase letters in the source, so you should test for ivysaur instead of Ivysaur!

Define a npm script `test:e2e` for running the e2e tests from the command line.

Remember that the Playwright tests assume that the application is up and running when you run the test! Instead of starting the app manually, you should now configure a Playwright development server to start the app while tests are executed, see here how that can be done.

Ensure that the test passes locally.

Once the end-to-end test works in your machine, include it in the GitHub Action workflow. That should be pretty easy by following this.

### Cypress

Set Cypress up (you'll find here all the info you need) and use this test first:

```javascript
describe("Pokedex", function () {
  it("front page can be opened", function () {
    cy.visit("http://localhost:5000");
    cy.contains("ivysaur");
    cy.contains(
      "Pokémon and Pokémon character names are trademarks of Nintendo."
    );
  });
});
```

Define a npm script test:e2e for running the e2e tests from the command line.

Note is that although the page renders the Pokemon names with an initial capital letter, the names are actually written with lowercase letters in the source, so you should test for ivysaur instead of Ivysaur!

Ensure that the test passes locally. Remember that the Cypress tests assume that the application is up and running when you run the test! If you have forgotten the details, please see part 5 how to get up and running with Cypress.

Once the end-to-end test works in your machine, include it in the GitHub Action workflow. By far the easiest way to do that is to use the ready-made action cypress-io/github-action. The step that suits us is the following:

```yaml
- name: e2e tests
  uses: cypress-io/github-action@v5
  with:
  command: npm run test:e2e
  start: npm run start-prod
  wait-on: http://localhost:5000copy
  Three options are used: command specifies how to run Cypress tests, start gives npm script that starts the server, and wait-on says that before the tests are run, the server should have started on url http://localhost:5000.
```

Note that you need to build the app in GitHub Actions before it can be started in production mode!

Once the pipeline works...

Once you are sure that the pipeline works, write another test that ensures that one can navigate from the main page to the page of a particular Pokemon, e.g. ivysaur. The test does not need to be a complex one, just check that when you navigate to a link, the page has some proper content, such as the string chlorophyll in the case of ivysaur.

Note the Pokemon abilities are written with lowercase letters in the source code (the capitalization is done in CSS), so do not test for Chlorophyll but rather chlorophyll.

End-to-end tests are nice since they give us confidence that software works from the end user's perspective. The price we have to pay is the slower feedback time. Now executing the whole workflow takes quite much longer.

```

```
