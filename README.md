<!-- @format -->

# RunningTrack

RunningTrack is a full stack JavaScript application built with the MERN stack.

Live demo: https://pure-spire-55259.herokuapp.com/

This application is hosted on Heroku - please allow a few moments for the initial load.

## Overview

RunningTrack enables users to record key metrics from their running sessions, such as distance and time. It logs all of these entries by date and calculates the user’s average speed to track their progress over time.

Users are able to register an account, enter profile information such as location, height and weight, and begin recording their running data. In addition, users can edit account details, delete their account and remove running entries.

Accounts are authenticated with JWT and bcrypt, enabling users to access a secure, unique account with personalised information and the ability to sign in and out.

All user information is stored in MongoDB Atlas for persistent data.

## Features

### Visiting the app

On entry to the site, all visitors are greeted with a full screen landing page featuring a call-to-action.

![Landing page](/images/01-landing-page.png)

Visitors are directed to a sign-up page for new users and a login page for existing users.

There are two distinct paths for new and existing users:

#### New users

- New users fill out a sign-up form that includes password verification.
- Users are then directed to a ‘Create Account’ page upon registration to fill out their account details, including body measurements.
- After account details have been entered, users are redirected to the app dashboard where they are prompted to add a new running entry.
- The 'Add Entry' form requires information about the running session including the date, distance run and time taken.
- Once confirmed, the user is redirected back to the dashboard where all entries are displayed.

#### Existing users

- Upon login, users are directed to the dashboard where they see an overview of their running progress.

### Dashboard

The dashboard is the core of the application, enabling users to see an overview of their progress and enter new exercise details.

#### Banner

- At the top of the dashboard, users are greeted with a dynamic welcome message featuring their first name.
- A ‘Stats’ section displays metrics including the total number of runs completed, total distance covered and the fastest speed achieved.
- An ‘Awards’ section displays badges depending on the user progress e.g. ’10 runs completed’.
- Users can add new sessions by clicking the ‘Add Entry’ button which will redirect to the Add Entry form page.

#### Entries table

- An entries table displays all of the user’s recorded running entries, ordered by the most recent date.
- The speed of each run is calculated dynamically based on the distance and the speed.
- Each run is compared with the fastest overall time, and any entries that match the fastest time are highlighted in green.
- Each entry can be removed by clicking the corresponding ‘X’ at the end of each record, followed by a confirmation prompt to ensure that the user is sure.
- The entries table is paginated to limit the total number of records displayed on each page to ten. This improves the user experience and avoids the need for scrolling in order to view older data.

### Account

- Navigating to the ‘Account’ page, the user can view a breakdown of their account information.
- The user profile image is pulled in dynamically using Gravatar. If the email address isn’t associated with a Gravatar account, a default image will be displayed instead.
- The user name, email address and personal info is displayed, as well as body metrics.
- Clicking the 'Update Account' button, the user is directed to the update account page where they can amend information on their account.
- The user also has the ability to remove their account by clicking the ‘Delete Account’ button, at which point they will be greeted with a warning prompt advising that this cannot be undone.

## Technologies

### Back End

- MongoDB
- ExpressJS
- NodeJS
- bcrypt
- Gravatar
- JWT (JSON Web Token)
- Mongoose

### Front End

- ReactJS
- Redux
- Axios
- Moment
- UUID
- SASS (SCSS)

## Functionality

### Back End

- Back end code written in Node, with application served via Express.
- API CRUD endpoints for users, authorisation, account details and run entries data.
- Connect to MongoDB database via Mongoose, hosted on MongoDB Atlas.
- Database model schemas created using Mongoose.
- Salt and hash password encryption through bcrypt.
- Token verification using JSON Web Token with expiring tokens stored on front end via cookie.
- User email processed by Gravatar to retrieve profile image if it exists (default image displayed if not).

### Front End

- Front end code written in React for dynamically rendered views and view state.
- Application state management controlled using Redux to trigger actions and update UI accordingly.
- Additional state management using built-in useState React hook for form inputs and pagination.
- Axios used for cleaner HTTP requests to back end for CRUD actions.
- Mobile-first design featuring fully responsive layout, enabling runners to use app on the go.
- HTML form validation for login, registration, create/update account information and running entries. Validation includes text/number/date/email/password fields and min/max lengths.
- Custom UI modular styles written in SCSS, enabling module customisation and easier maintenance.
- Moment provides reliable date formatting and processing via react-moment.
- Dynamic feedback messages displayed to inform the user of successful operations and errors. Unique IDs generated for feedback messages via UUID.
