Overview: 

You will be creating a simple social media application where users can view posts and create new ones. The application will have authentication guards(canActivate) to protect routes and a resolver to fetch data.

Tasks 

Auth Service:
Create a fake authentication service (AuthService) that simulates user authentication.
(using fake credentials/ simple login flag), 
keep some users data in the service to simulate login and authentication.


Include methods for login (using email and password), logout, and checking authentication status.

Posts Service:
Create a service to manage posts data.

Components:
Create PostsComponent to display posts.
Create CreatePostComponent to create new posts.
Display confirmation dialog in CreatePostComponent when user tries to leave the page if there are any unsaved changes.
Implement guards to protect the routes and to fetch the data before navigation. 

usedeactivate guard to prevent users from leaving the CreatePostComponent if there are unsaved changes.
use canActivate guard to protect the route to CreatePostComponent, allowing only authenticated users to access


