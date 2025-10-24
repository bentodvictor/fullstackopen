const { test, expect, describe, beforeEach } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')
const baseUrl = 'http://localhost:5173'

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post(`${baseUrl}/api/testing/reset`)
    await request.post(`${baseUrl}/api/users`, {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto(baseUrl)
  })

  test('Login form is show', async ({ page }) => {

    const locator = await page.getByText('BLOGS')
    await expect(locator).toBeVisible({ timeout: 10000 })
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
    await expect(page.getByText('Login')).toBeVisible()
  })

  test('a new blog can be created', async ({ page }) => {

  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByTestId('username').fill('mluukkai')
      await page.getByTestId('password').fill('salainen')

      await page.getByRole('button', { name: 'Login' }).click()

      await expect(page.getByText('logged-in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('username').fill('mluukkai')
      await page.getByTestId('password').fill('salai')

      await page.getByRole('button', { name: 'Login' }).click()

      await expect(page.getByText('invalid username or password')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'blog playwright', 'Playwright', 'http://localhost:5173')

      await expect(page.getByText(`A NEW BLOG "BLOG PLAYWRIGHT" BY "PLAYWRIGHT" ADDED`)).toBeVisible()
      await expect(page.getByRole('button', { name: 'create new blog' })).toBeVisible()
      await expect(page.getByRole('button', { name: 'show' })).toBeVisible()
      await expect(page.getByText('blog playwright Playwright')).toBeVisible()
    })
  })

  describe('When created a blog', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await createBlog(page, 'blog playwright 1', 'Playwright', 'http://localhost:5173')
      await createBlog(page, 'blog playwright 2', 'Playwright', 'http://localhost:5173')
      await createBlog(page, 'blog playwright 3', 'Playwright', 'http://localhost:5173')
      await createBlog(page, 'blog playwright 4', 'Playwright', 'http://localhost:5173')
    })

    test('a blog can be liked', async ({ page }) => {
      const blog = page.locator('.blog').filter({ hasText: 'blog playwright 1' })

      await blog.getByRole('button', { name: 'show' }).click()
      await expect(blog.getByText('http://localhost:5173')).toBeVisible()
      await expect(blog.getByText('likes 0')).toBeVisible()

      await blog.getByRole('button', { name: 'add like' }).click()
      await expect(blog.getByText('likes 1')).toBeVisible()
      await expect(blog.getByText('likes 0')).not.toBeVisible()
    })

    test('a user who added the blog can delete it', async ({ page }) => {
      const blog = page.locator('.blog').filter({ hasText: 'blog playwright 1' })

      await blog.getByRole('button', { name: 'show' }).click()
      await expect(blog.getByText('http://localhost:5173')).toBeVisible()

      await expect(blog.getByRole('button', { name: 'remove' })).toBeVisible()

      page.on('dialog', async (dialog) => {
        await dialog.accept()
      })

      await blog.getByRole('button', { name: 'remove' }).click()


      await expect(blog.getByText('blog playwright 1')).not.toBeVisible()
      await expect(blog).not.toBeVisible()
    })

    test('only the user who added the blog sees the blogs delete button', async ({ page, request }) => {
      const blog = page.locator('.blog').filter({ hasText: 'blog playwright 1' })

      await blog.getByRole('button', { name: 'show' }).click()

      await expect(blog.getByRole('button', { name: 'remove' })).toBeVisible()

      await page.getByRole('button', { name: 'logout' }).click()
      await request.post(`${baseUrl}/api/users`, {
        data: {
          name: 'Matti Luukkainen 2',
          username: 'mluukkai2',
          password: 'salainen2'
        }
      })
      await loginWith(page, 'mluukkai2', 'salainen2')

      await blog.getByRole('button', { name: 'show' }).click()
      await expect(blog.getByRole('button', { name: 'remove' })).not.toBeVisible()
    })

    test('blogs are arranged in the order according to the likes', async ({ page }) => {
      const blog_1 = page.locator('.blog').filter({ hasText: 'blog playwright 1' });
      const blog_2 = page.locator('.blog').filter({ hasText: 'blog playwright 2' });
      const blog_3 = page.locator('.blog').filter({ hasText: 'blog playwright 3' });
      const blog_4 = page.locator('.blog').filter({ hasText: 'blog playwright 4' });

      // Add likes to each blog
      await blog_1.getByRole('button', { name: 'show' }).click();
      await blog_2.getByRole('button', { name: 'show' }).click();
      await blog_3.getByRole('button', { name: 'show' }).click();
      await blog_4.getByRole('button', { name: 'show' }).click();

      await blog_2.getByRole('button', { name: 'add like' }).click();
      await page.waitForTimeout(500);
      await blog_3.getByRole('button', { name: 'add like' }).click();
      await page.waitForTimeout(500);
      await blog_3.getByRole('button', { name: 'add like' }).click();
      await page.waitForTimeout(500);
      await blog_4.getByRole('button', { name: 'add like' }).click();
      await page.waitForTimeout(500);
      await blog_4.getByRole('button', { name: 'add like' }).click();
      await page.waitForTimeout(500);
      await blog_4.getByRole('button', { name: 'add like' }).click();
      await page.waitForTimeout(500);

      // Wait for the likes count to update
      await expect(blog_4).toContainText('likes 3');
      await expect(blog_3).toContainText('likes 2');
      await expect(blog_2).toContainText('likes 1');
      await expect(blog_1).toContainText('likes 0');

      await blog_1.getByRole('button', { name: 'hide' }).click();
      await blog_2.getByRole('button', { name: 'hide' }).click();
      await blog_3.getByRole('button', { name: 'hide' }).click();
      await blog_4.getByRole('button', { name: 'hide' }).click();
      
      // Check if blogs are ordered correctly by likes
      await expect(page.locator('.blog').first()).toContainText('blog playwright 4');
      await expect(page.locator('.blog').last()).toContainText('blog playwright 1');
    });
  })
})