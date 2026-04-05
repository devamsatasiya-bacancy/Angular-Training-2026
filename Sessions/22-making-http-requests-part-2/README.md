### Book List Component:
- Implement a search bar for searching books by title.
- use debouncing to limit the unnecessary api calls
- Implement filters for categories and price range
- Pass these parameters in the API using Query Params, and update the book list based on the response.

### Book Service:
- Set appropriate headers (e.g., Content-Type, Accept) for HTTP requests.


### Error Service:
- Create an error service and make an error Subject or BehaviorSubject to handle errors from HTTP requests.Emit errors and Subscribe to the error Subject or BehaviorSubject in components to handle and display errors.

### Global Error Handling with Interceptor:
- Create an HTTP interceptor for global error handling.
- Implement error handling logic using catchError to handle different types of errors.
- Use an interceptor to throw an error and handle that error in the component while subscribing to the api call.

### Add Book:
Create a component  for adding a new book.
Implement form controls to capture book details (title, category, price, file). 
For file uploads, use FormData to append the file with metadata.
Make an HTTP POST request to add the new book.
use observe: 'events' to track the progress of the file upload and display a progress bar in the UI.
also use objserve: 'response' to get the full response from the server after the upload is complete.

- use timeout in the api call to handle cases where the server takes too long to respond. Display an appropriate message to the user if a timeout occurs.
- Implement retry logic for failed requests, allowing the user to retry the operation a certain number of times before giving up.

### logging service:
- use interceptors to log (for now just use console.log) all outgoing HTTP requests and incoming responses, including errors, along with reponse times. This will help in debugging and monitoring the application's network activity.

### network status:
- Implement a service to monitor network status (online/offline) and display appropriate messages to the user when the network status changes.

###  loading interceptor:
- Create an HTTP interceptor to manage a loading indicator for all HTTP requests. Show the loading indicator when a request is in progress and hide it when the request completes or fails.


- currently im using firebase for backend, so please use the httpclient to make api calls to firebase. assume a url in the form of `https://your-firebase-project.firebaseio.com/books.json` for fetching and adding books , and use appropriate HTTP methods (GET for fetching, POST for adding) along with the necessary headers and body data, keep the url in environments/environment.ts file.

- for file uploads, dont use firebase, instead use URL.createObjectURL() to create a temporary URL for the uploaded file and display it in the UI, 