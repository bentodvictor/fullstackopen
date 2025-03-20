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

# 9.15
Create a new Vite app with TypeScript.

This exercise is similar to the one you have already done in Part 1 of the course, but with TypeScript and some extra tweaks. Start off by modifying the contents of main.tsx to the following:

```javascript
import ReactDOM from 'react-dom/client'
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
)
```

and App.tsx:

```javascript
const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <h1>{courseName}</h1>
      <p>
        {courseParts[0].name} {courseParts[0].exerciseCount}
      </p>
      <p>
        {courseParts[1].name} {courseParts[1].exerciseCount}
      </p>
      <p>
        {courseParts[2].name} {courseParts[2].exerciseCount}
      </p>
      <p>
        Number of exercises {totalExercises}
      </p>
    </div>
  );
};

export default App;
```

and remove the unnecessary files.

The whole app is now in one component. That is not what we want, so refactor the code so that it consists of three components: Header, Content and Total. All data is still kept in the App component, which passes all necessary data to each component as props. Be sure to add type declarations for each component's props!

The Header component should take care of rendering the name of the course. Content should render the names of the different parts and the number of exercises in each part, and Total should render the total sum of exercises in all parts.

The App component should look somewhat like this:

```javascript
const App = () => {
  // const-declarations

  return (
    <div>
      <Header name={courseName} />
      <Content ... />
      <Total ... />
    </div>
  )
};
```

# 9.16
Let us now continue extending the app created in exercise 9.15. First, add the type information and replace the variable courseParts with the one from the example below.

```javascript
interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBasic extends CoursePartBase {
  description: string;
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartBase {
  description: string;
  backgroundMaterial: string;
  kind: "background"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground;

const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
    kind: "basic"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: "group"
  },
  {
    name: "Basics of type Narrowing",
    exerciseCount: 7,
    description: "How to go from unknown to string",
    kind: "basic"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
    kind: "background"
  },
  {
    name: "TypeScript in frontend",
    exerciseCount: 10,
    description: "a hard part",
    kind: "basic",
  },
];
```

Now we know that both interfaces CoursePartBasic and CoursePartBackground share not only the base attributes but also an attribute called description, which is a string in both interfaces.

Your first task is to declare a new interface that includes the description attribute and extends the CoursePartBase interface. Then modify the code so that you can remove the description attribute from both CoursePartBasic and CoursePartBackground without getting any errors.

Then create a component Part that renders all attributes of each type of course part. Use a switch case-based exhaustive type checking! Use the new component in component Content.

Lastly, add another course part interface with the following attributes: name, exerciseCount, description and requirements, the latter being a string array. The objects of this type look like the following:

```json
{
  name: "Backend development",
  exerciseCount: 21,
  description: "Typing the backend",
  requirements: ["nodejs", "jest"],
  kind: "special"
}
```

Then add that interface to the type union CoursePart and add the corresponding data to the courseParts variable. Now, if you have not modified your Content component correctly, you should get an error, because you have not yet added support for the fourth course part type. Do the necessary changes to Content, so that all attributes for the new course part also get rendered and that the compiler doesn't produce any errors.

# 9.17
Create a TypeScript React app with similar configurations as the apps of this section. Fetch the diaries from the backend and render those to screen. Do all the required typing and ensure that there are no Eslint errors.

Remember to keep the network tab open. It might give you a valuable hint...

You can decide how the diary entries are rendered. If you wish, you may take inspiration from the figure below. Note that the backend API does not return the diary comments, you may modify it to return also those on a GET request.

# 9.18
Make it possible to add new diary entries from the frontend. In this exercise you may skip all validations and assume that the user just enters the data in a correct form.

# 9.19
Notify the user if the the creation of a diary entry fails in the backend, show also the reason for the failure.

See eg. this to see how you can narrow the Axios error so that you can get hold of the error message.

# 9.20
Addition of a diary entry is now very error prone since user can type anything to the input fields. The situation must be improved.

Modify the input form so that the date is set with a HTML date input element, and the weather and visibility are set with HTML radio buttons. We have already used radio buttons in part 6, that material may or may not be useful...

Your app should all the time stay well typed and there should not be any Eslint errors and no Eslint rules should be ignored.

# 9.21: Patientor, step1
Create an endpoint /api/patients/:id to the backend that returns all of the patient information for one patient, including the array of patient entries that is still empty for all the patients. For the time being, expand the backend types as follows:

```javascript
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {
}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[]
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
```

# 9.22: Patientor, step2
Create a page for showing a patient's full information in the frontend.

The user should be able to access a patient's information by clicking the patient's name.

Fetch the data from the endpoint created in the previous exercise.

You may use MaterialUI for the new components but that is up to you since our main focus now is TypeScript.

You might want to have a look at part 7 if you don't yet have a grasp on how the React Router works.

The example uses Material UI Icons to represent genders.

# 9.23: Patientor, step 3
Define the types OccupationalHealthcareEntry and HospitalEntry so that those conform with the new example data. Ensure that your backend returns the entries properly when you go to an individual patient's route.

Use types properly in the backend! For now, there is no need to do a proper validation for all the fields of the entries in the backend, it is enough e.g. to check that the field type has a correct value.

# 9.24: Patientor, step 4
Extend a patient's page in the frontend to list the date, description and diagnoseCodes of the patient's entries.

You can use the same type definition for an Entry in the frontend. For these exercises, it is enough to just copy/paste the definitions from the backend to the frontend.

# 9.25: Patientor, step 5
Fetch and add diagnoses to the application state from the /api/diagnoses endpoint. Use the new diagnosis data to show the descriptions for patient's diagnosis codes.

# 9.26: Patientor, step 6
Extend the entry listing on the patient's page to include the Entry's details, with a new component that shows the rest of the information of the patient's entries, distinguishing different types from each other.

You could use eg. Icons or some other Material UI component to get appropriate visuals for your listing.

You should use a switch case-based rendering and exhaustive type checking so that no cases can be forgotten.

# 9.27: Patientor, step 7
We have established that patients can have different kinds of entries. We don't yet have any way of adding entries to patients in our app, so, at the moment, it is pretty useless as an electronic medical record.

Your next task is to add endpoint /api/patients/:id/entries to your backend, through which you can POST an entry for a patient.

Remember that we have different kinds of entries in our app, so our backend should support all those types and check that at least all required fields are given for each type.

In this exercise, you quite likely need to remember this trick.

You may assume that the diagnostic codes are sent in the correct form and use eg. the following kind of parser to extract those from the request body:

```javascript
const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};
```

# 9.28: Patientor, step 8
Now that our backend supports adding entries, we want to add the corresponding functionality to the frontend. In this exercise, you should add a form for adding an entry to a patient. An intuitive place for accessing the form would be on a patient's page.

In this exercise, it is enough to support one entry type. All the fields in the form can be just plain text inputs, so it is up to the user to enter valid values.

Upon a successful submission the new entry should be added to the correct patient and the patient's entries on the patient page should be updated to contain the new entry.

If a user enters invalid values to the form and backend rejects the addition, show a proper error message to the user

# 9.29: Patientor, step 9
Extend your solution so that it supports all the entry types

# 9.30: Patientor, step 10
Improve the entry creation forms so that it makes it hard to enter incorrect dates, diagnosis codes and health rating.

Diagnosis codes are now set with Material UI multiple select and dates with Input elements with type date.