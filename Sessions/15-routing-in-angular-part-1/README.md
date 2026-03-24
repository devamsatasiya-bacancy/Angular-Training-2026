Task: Job Portal Routing
**use Angular 21 version, use @for and @if directives, use camelCasing**


Description:
I have create all the pages for the job portal application. Now, I want to implement routing in my Angular application to navigate between these pages.
- Home
- Jobs
- About
- Contact


Create separate components for each page
create a separate navbar component for navigation
create a separate contact form component for the Contact page, and redirect to the Contact page when the form is submitted , 

show a success message on the Contact page after form submission, 
create a separate job detail component for displaying job details, and navigate to the Job Detail page when a job is clicked on the Jobs page,also create a toast component to show action messages after form submission and job application.

create a service to manage job data and use it to fetch and display job listings on the Jobs page.,


Add a back button in Job Detail to return to the Jobs page


Use both absolute and relative paths


Highlight the active route in the navbar


Add a Page Not Found route using a wildcard route.



For UI/UX , use sharp border radius, vibrant colors, and bold typography to create a visually appealing and user-friendly interface, dont forget to use the following CSS variables for consistent styling across the application, only use few colors and fonts to maintain a cohesive design:
:root {

-- color-primary: #FF2A00;

-- color-background: #FAFAFA;

-- color-surface: #FFFFFF;

-- color-text: #0B0F19;

-- color-muted: #94A3B8;

-- color-accent: #FF8A00;

-- font-heading: 'Bebas Neue', sans-serif;
-- font-body: 'Manrope', sans-serif;
-- radius-pill: 9999px;
-- radius-card: 0px;
-- shadow-heavy: 0 20px 40px -5px rgba(255, 42, 0,
0.2);

}