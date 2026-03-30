1. Create a reactive form for a company with fields like name, email, website, and phone number.
2. Set the default values of the company form with Bacancy's information when the form loads.
3. Add validation rules for the form fields, such as making certain fields required and email validation.
4. Create a custom validator to ensure the phone number follows the given phone number format (e.g., country code + number), keep the validator flexible for different country formats.
5. Within the company form, include a section to add and delete projects.
6. Each project should have fields like name, description, start date, and end date.
7. Implement functionality to add new projects to the company and remove existing projects from the company.
8. Create an async validator for the project name field to check if the entered project name already exists for that company. If it does, display an error message indicating that the project name is already taken.
9. Display appropriate error messages for any validation errors in the form fields.

11. On click reset button - set default values again in company form.
12. On click submit button - display form values.
13. add a functionality to disable submit button until the form is valid.
14. create two main routes 
    - /contact-us : which will have the company form and the functionality to add and delete projects.
    - /project-details : which will display the details of the projects added in the company form.
15. use Angular services to manage the state of the company and projects data across the application.

## validators:
    1. custom validator for website field to ensure it starts with "http://" or "https://" or "www."
    2. check date , start date should not be greater than end date.



