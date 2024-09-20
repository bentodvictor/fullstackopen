# 5.17: Blog List End To End Testing, step 1
Create a new npm project for tests and configure Playwright there.

Make a test to ensure that the application displays the login form by default.

The body of the test should be as follows:

```javascript
const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    // ...
  })
})
```

# 5.18: Blog List End To End Testing, step 2
Do the tests for login. Test both successful and failed login. For tests, create a user in the beforeEach block.

The body of the tests expands as follows

```javascript
const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    // empty the db here
    // create a user for the backend here
    // ...
  })

  test('Login form is shown', async ({ page }) => {
    // ...
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      // ...
    })

    test('fails with wrong credentials', async ({ page }) => {
      // ...
    })
  })
})
```

The beforeEach block must empty the database using, for example, the reset method we used in the material.

# 5.19: Blog List End To End Testing, step 3
Create a test that verifies that a logged in user can create a blog. The body of the test may look like the following

```javascript
describe('When logged in', () => {
  beforeEach(async ({ page }) => {
    // ...
  })

  test('a new blog can be created', async ({ page }) => {
    // ...
  })
})
```

The test should ensure that the created blog is visible in the list of blogs.

# 5.20: Blog List End To End Testing, step 4
Do a test that makes sure the blog can be liked.

# 5.21: Blog List End To End Testing, step 5
Make a test that ensures that the user who added the blog can delete the blog. If you use the window.confirm dialog in the delete operation, you may have to Google how to use the dialog in the Playwright tests.

# 5.22: Blog List End To End Testing, step 6
Make a test that ensures that only the user who added the blog sees the blog's delete button.

# 5.23: Blog List End To End Testing, step 7
Do a test that ensures that the blogs are arranged in the order according to the likes, the blog with the most likes first.

This task is significantly more challenging than the previous ones.

This was the last task of the section and it's time to push the code to GitHub and mark the completed tasks in the exercise submission system.
