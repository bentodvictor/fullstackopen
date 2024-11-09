# 7.1: Routed Anecdotes, step 1
Add React Router to the application so that by clicking links in the Menu component the view can be changed.

At the root of the application, meaning the path /, show the list of anecdotes.

The Footer component should always be visible at the bottom.

The creation of a new anecdote should happen e.g. in the path create.

# 7.2: Routed Anecdotes, step 2
Implement a view for showing a single anecdote

Navigating to the page showing the single anecdote is done by clicking the name of that anecdote.

# 7.3: Routed Anecdotes, step3
The default functionality of the creation form is quite confusing because nothing seems to be happening after creating a new anecdote using the form.

Improve the functionality such that after creating a new anecdote the application transitions automatically to showing the view for all anecdotes and the user is shown a notification informing them of this successful creation for the next five seconds.