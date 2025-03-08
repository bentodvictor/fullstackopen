# 9.8: Patientor backend, step1
Initialize a new backend project that will work with the frontend. Configure ESlint and tsconfig with the same configurations as proposed in the material. Define an endpoint that answers HTTP GET requests for route /api/ping.

The project should be runnable with npm scripts, both in development mode and, as compiled code, in production mode.

# 9.9: Patientor backend, step2
Fork and clone the project patientor. Start the project with the help of the README file.

You should be able to use the frontend without a functioning backend.

Ensure that the backend answers the ping request that the frontend has made on startup. Check the developer tools to make sure it works:

You might also want to have a look at the console tab. If something fails, part 3 of the course shows how the problem can be solved.

# 9.10: Patientor backend, step3
Create a type Diagnosis and use it to create endpoint /api/diagnoses for fetching all diagnoses with HTTP GET.

Structure your code properly by using meaningfully-named directories and files.

Note that diagnoses may or may not contain the field latin. You might want to use optional properties in the type definition.

# 9.11: Patientor backend, step4
Create data type Patient and set up the GET endpoint /api/patients which returns all the patients to the frontend, excluding field ssn. Use a utility type to make sure you are selecting and returning only the wanted fields.

In this exercise, you may assume that field gender has type string.

Try the endpoint with your browser and ensure that ssn is not included in the response:

After creating the endpoint, ensure that the frontend shows the list of patients

# 9.12: Patientor backend, step5
Create a POST endpoint `/api/patients` for adding patients. Ensure that you can add patients also from the frontend. You can create unique ids of type string using the uuid library:

```javascript
import { v1 as uuid } from 'uuid'
const id = uuid()copy
```

# 9.13: Patientor backend, step6
Set up safe parsing, validation and type predicate to the `POST /api/patients` request.

Refactor the gender field to use an enum type.

# 9.14: Patientor backend, step7
Use Zod to validate the requests to the POST endpoint /api/patients.