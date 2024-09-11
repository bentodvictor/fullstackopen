# 5.1: Blog List Frontend, step 1
Clone the application from GitHub with the command:

`git clone https://github.com/fullstack-hy2020/bloglist-frontendcopy`

Remove the git configuration of the cloned application

```bash
cd bloglist-frontend   // go to cloned repository
rm -rf .git
```

The application is started the usual way, but you have to install its dependencies first:

```bash
npm install
npm run dev
```

Implement login functionality to the frontend. The token returned with a successful login is saved to the application's state user.

If a user is not logged in, only the login form is visible.

If the user is logged-in, the name of the user and a list of blogs is shown.

User details of the logged-in user do not have to be saved to the local storage yet.

> NB You can implement the conditional rendering of the login form like this for example:

```javascript
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form>
          //...
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}
```

# 5.2: Blog List Frontend, step 2
Make the login 'permanent' by using the local storage. Also, implement a way to log out.

Ensure the browser does not remember the details of the user after logging out.

# 5.3: Blog List Frontend, step 3
Expand your application to allow a logged-in user to add new blogs.

# 5.4: Blog List Frontend, step 4
Implement notifications that inform the user about successful and unsuccessful operations at the top of the page. For example, when a new blog is added, the following notification can be shown:

Failed login can show the following notification.

The notifications must be visible for a few seconds. It is not compulsory to add colors.