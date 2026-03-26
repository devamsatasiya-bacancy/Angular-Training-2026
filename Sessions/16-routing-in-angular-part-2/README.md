Assignment: Build a "User Directory" App
You are required to build a simple User Directory application using Angular. The app displays a list of users, allows viewing a user's profile, and lets you browse the user's posts. Focus entirely on making the routing work correctly. You may use hardcoded data throughout.


Route Structure
Your app must support the following URL structure:
/                  
/users               
/users/:id              
/users/:id/posts          
/not-found                
/** (any unknown URL)     


Requirements

Outsource Route Configuration
Define all routes inside app-routing.module.ts only. Do not configure routes inside app.module.ts

Redirects and Wildcard Routes
The empty path / should redirect to /users. Any URL that does not match a defined route should redirect to /not-found. Think about the correct pathMatch strategy to use for the empty path and why it matters.




Route Parameters — Snapshot
On the /users page, display a hardcoded list of at least 3 users. Each user should be a clickable link navigating to /users/:id. On the UserDetailComponent, read and display the user's id from the URL using the snapshot approach.

Route Parameters — Reactive
On the UserDetailComponent, add a "View Posts" link that navigates to /users/:id/posts. On the PostListComponent, read and display the :id from the URL using the reactive (subscribe) approach. Think about why the reactive approach is useful when navigating between routes that share the same component.

Query Params and Fragments
When navigating to /users/:id/posts, pass at least one query parameter (for example, a sort order or filter value) and one fragment. On the PostListComponent, read and display the values of the query parameter and the fragment.

Child Routes
/users/:id should be the parent route with UserDetailComponent. posts should be a child route under it with PostListComponent. Add a router-outlet inside user-detail.component.html so the child component renders inside the parent.

Bonus (Optional)
Add a "Go Back" button on the PostListComponent using programmatic navigation
Conditionally show a label or message based on the query parameter value
Use the routerLinkActive directive to highlight the active link

Note: You may use hardcoded data for users and posts. No backend or API integration is required. Focus entirely on routing behavior.

