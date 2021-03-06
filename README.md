# team34 Introduction

Our application is called MedPort and is a site for displaying medical test reports and results in one convenient place for patients and doctors to review.

URL: https://stark-headland-93903.herokuapp.com/


# Features

- Upload Test Results
    - Both doctors and patients can upload test reports, and see previous files that they uploaded
- View Test Results
    - A doctor can view the test results which they and their patient uploaded, and can filter per patient
    - A patient can view all test results they and thier doctor uploaded
- Requests
    - Patients and doctors can send requests to each other to set appointments for phone calls, in-person appointments, or for another medical test.
- Profile
    - Patients and doctors can view their profile information (name, email, address, who's their doctor, which institution they're from, etc.)
    - general profile information such as name, email, address, postal code, etc. can be modified
- Sign-up
    - A patient signs-up with a referral code given by their doctor who wants them to sign up to the app. The referral code is associated with the doctor's ID.
    - A doctor can sign-up and choose an existing medical institution registered with our app; or, they register the medical institution that they are from into our app.
- Admin
    - Can create new institutions, doctors, patients
    - view all institutions and its doctors and their patients
    - modify info for an institution, doctor, patient
    - delete an institution, doctor, patient

# Overview of routes in the Express server

## /api/patients, /api/doctors
- create new patient (creates new user at the same time; occurs during sign-up)
    - `POST /api/patients`
    - expected data: `username`, `password`, `firstName`, `lastName`, `email`, `address`, `postalCode`, `HCN` (health card number), `doctorID`
        - fields are validated before being saved into database
    - sends back the newly created patient
- create new doctor (creates new user at the same time; occurs during sign-up)
    - `POST /api/doctors`
    - expected data: `username`, `password`, `firstName`, `lastName`, `email`, `MID` (medical id), `institutionID`
    - sends back the newly created doctor
- get doctor document by doctorID
    - `GET /api/doctors/:id`
- get list of patients who has a specific doctor (given the doctorID)
    - `GET /api/doctors/patients/:id`

## /api/users
- login `POST /api/users/login` by sending username and password
- logout: `GET /api/users/logout`
- check-session `GET /api/users/check-session`
- get the usertype of a user, given username
    - `GET /api/users/userType/:username`

## /api/institutions
- create new medical institution (registers hospital/institution into our app)
    - `POST /api/institutions`
    - expected data: `name`, `address`, `postalCode`, `phoneNumber`
    - sends back the newly created institution
- get list of all institutions: `GET /api/institutions`
- get info about a specific insititution (gives the insitiution document) given the institutionID: `GET /api/institutions:id`

## /api/requests
- create a new request
    - `POST /api/requests`
    - expected data: `createdBy` (patient/doctor id of whoever created the request), `receiver` (patient/doctor id of whoever the request is sent to),
    `type` (type of the request - "Phone call", "Appointment", "Test"), `date`, `time`, `reason` (optional)
    - sends back the newly created request
- get all of the requests created by the current logged-in user
    - `GET /api/requests`
    - used in the app when displaying the table of the user's pending and confirmed requests
- change the status of a specific request (confirm the request)
    - `PATCH /api/requests/status/:id`
    - used when a patient/doctor presses the confirm button on a request that was pending on them. This means they confirmed the request from the other party and the status of request is now "confirmed"

## /api/files
- create a new File object which stores data about a pdf medical report file
    - `POST /api/files`
    - expected data: `uploader` (patient/doctor id of whoever uploaded the file), `patient` (patientID of the patient who this medical file is about),
    `dateUploaded`, `reportType`, `fileName`, `base64` (includes the "data:application/pdf;base64," part in addition to the actual base64)
- gets a list of all Files that were uploaded by the current logged-in user
    - `GET /api/files/uploaded`
    - used when displaying the view of previously uploaded files, and being able to click on the files to download them
- gets a list of all Files that are associated with a specific patient (given patientID)
    - `GET /api/files/patients/:patientId`

## /api/profile
- get the profile information of the current logged-in user (i.e. if the user is a patient, it returns the entire patient document. Or if the user is a doctor, it returns the entire doctor document)
    - `GET /api/profile`
- update a field in the profile info of the current logged-in user
    - `PATCH /api/profile`
    - expected data: \
       e.g. `{ "op": "replace", "path": "/generalProfile.email", "value": "zsfrf@msf.com" }` \
       e.g. `{ "op": "replace", "path": "/address", "value": "123 Hello St" }`
    - sends back the entire profile info (patient/doctor document)
    - used when user is modifying their general profile details on the profile page
- gets only the general profile info (firstName, lastName, email) for another user, given their patient/doctor ID
    - `GET /api/profile/:id`
    - the logged-in user is only authorized to see other people's name and contact info, but not other confidential details
- get logged-in user's profile image as base64: `GET /api/profile/image`
- change the logged-in user's profile image
    - `POST /api/profile/image`
    - expected data: `imageBase64` (includes the "data:image/png;base64," part in addition to the actual base64)

# Login Credentials

## Patient Credentials

Username: **user**

Password: **user**

## Doctor Credentials

Username: **user2**

Password: **user2**

## Admin Credentials

Username: **admin**

Password: **admin**

# Instructions

Starting at the home page, read the website description features on the bottom of the page.

## Patient


### Sign-up
1. Click `Sign up` in the "Don't have an account? Sign up" statement (underneath the login box).

2. Enter `KWNZLS` as the patient referral code , and then press `Next`.

3. Enter in random information for the patient's profile details and then press `Submit`\
(you must input something for every field, otherwise it will notify you and block you from proceeding).\
    - input valid "First Name" and "Last Name"
        - minimum 2 characters
        - ex. `Jack`, `Doe`
    - input valid "Address"
        - minimum 4 characters
        - ex. `123 Street`
    - input valid canadian "Postal Code"
        - ex. `L6A 2W6`
    - input valid "Health Card Number"
        - ex. `1234-123-123-ab`
    - input valid "Email"
        - needs "@"
        - ex. `user3@user.com`
    - input valid "Username"
        - minimum 3 characters
        - ex. `user3`
    - input valid "Password"
        - minimum 3 characters
        - ex. `password`

### Profile

1. Log in using the [patient credentials](#patient-credentials) and you will be taken to the dashboard.
    - If you want to navigate back to this dashboard when on other pages, press the heart website logo on the top-left corner.
    - The dashboard lists some health-related news articles that are retrieved by newsapi.org.
2. Hover over the user profile icon on the top right of the site, and click `Profile`.
    - You can see the patients's personal info, health card number, and the name of the patient's assigned doctor.
    - You can click the edit pencil button beside an editable personal info field (e.g. email). Type in the value you want to change and press enter to edit the profile info.
         - if you type in something invalid for a profile field, then it will display a message and not save that value
    - You can click on the profile image (or pencil beside the profile image) to replace the user's profile image
        - will display message if file does not fit requirements (must be png/jpg and less than 2mb).
        - users who never set their profile image will have the default profile image
        - NOTE: on localhost images up to 2mb uploaded fine, but on heroku it's not consistent. The same file on heroku sometimes uploads succesfully and other time heroku gives a 503 service unavailable error.
            - To avoid the error, either wait a while and then upload your profile image. Or try to use a very small image size (50 kb)

### Request

1. Click `Requests` on the navbar on the left-hand side.
2. On the "Pending Requests" tab, you will see requests that are in the pending state that were made either by you (patient) or a doctor.\
      A request is pending if the person to whom the request was sent to has not yet accepted the request.
3. You can see there is a request pending on you (patient) that was sent by your doctor. You can click the `Confirm` button to confirm this request.
    - You can click the "Confirmed Requests" tab to see previous and upcoming events from requests that have been confirmed by both parties.
4. Click `Submit a new Request` to send a request to your doctor. Fill out the fields to fill out a request, and then press `Submit`.
    - After you successfully submit a request, you will see the request appear under your "Pending Requests" table. The request will say "Waiting for confirmation", as you are waiting for your doctor to confirm your request.
    - If you don't want to submit a request, you can press the back button beside the "Submit a New Request" title to go back to your table of previous requests.

### Upload File

1. Click `Upload` on the navbar on the left-hand side. 
2. You can see previously uploaded files on the bottom.
    - it displays up to a max of the 5 last uploaded files
3. You can click on the name of a previously uploaded file to download the file.
4. To upload a file, input the type of medical report file that you are uploading, and then press the `Upload` button.
    - the file being uploaded must be a pdf and under 2mb, otherwise it will display messages saying you cannot upload yet

### See Results

1. Click `Results` on the navbar on the left-hand side.
2. You can see all of the results both you and your doctor have uploaded
3. Click on a blue download button to download the test result
    
Hover over the user profile icon on the top right of the site, and click `Log out`.


## Doctor

### Sign-up

1. Click `Sign up` in the "Don't have an account? Sign up" statement (underneath the login box).

2. Click `Are you a Doctor? Sign Up`

3. Enter in random information for the doctor's profile details and then press `Next`\
(you must input something for every field, otherwise it will notify you and block you from proceeding).\
    - input valid "First Name" and "Last Name"
        - minimum 2 characters
        - ex. `Jack`, `Doe`
    - input valid "Medical ID Number"
        - ex. `abcd12345678`
    - input valid "Email"
        - needs "@"
        - ex. `user4@user.com`
    - input valid "Username"
        - minimum 3 characters
        - ex. `user4`
    - input valid "Password"
        - minimum 3 characters
        - ex. `password`
        
4. i. Select an existing medical institution and press `Submit`.

    or 

   ii. Press `Create` to register your medical institution since it wasn't there before.
       - fill out the info for the institution and press `Submit`
       
### Profile
   
1. Log in using the [doctor credentials](#doctor-credentials) and you will be taken to the dashboard.
    - If you want to navigate back to this dashboard when on other pages, press the heart website logo on the top-left corner.
    - The dashboard lists some health-related news articles that are retrieved by newsapi.org.

2. Hover over the user profile icon on the top right of the site, and click `Profile`.
    - You can see the doctor's personal info, medical ID number, and info about the medical institution that they work at.
    - You can click the edit pencil button beside an editable personal info field (e.g. email). Type in the value you want to change and press enter to edit the profile info.
         - if you type in something invalid for a profile field, then it will display a message and not save that value
    - You can click on the profile image (or pencil beside the profile image) to replace the user's profile image
        - will display message if file does not fit requirements (must be png/jpg and less than 2mb).
        - users who never set their profile image will have the default profile image
        - NOTE: on localhost images up to 2mb uploaded fine, but on heroku it's not consistent. The same file on heroku sometimes uploads succesfully and other time heroku gives a 503 service unavailable error.
            - To avoid the error, either wait a while and then upload your profile image. Or try to use a very small image size (50 kb)

### Request

1. Click `Requests` on the navbar on the left-hand side.
2. On the "Pending Requests" tab, you will see requests that is in the pending state that were made either by you (doctor) or one of your patients.\
      A request is pending if the person to whom the request was sent to has not yet accepted the request.
3. You can see there is a request pending on you (doctor) that one of your patients sent. You can click the `Confirm` button to confirm this request.
    - You can click the "Confirmed Requests" tab to see previous and upcoming events from requests that have been confirmed by both parties.
   
4. Click `Submit a new Request`. Select which patient you want to send the request to out of your list of assigned patients. Then fill out the fields to fill out a request and press `Submit`.
    - After you successfully submit a request, you will see the request appear under your "Pending Requests" table. The request will say "Waiting for confirmation", as you are waiting for your patient to confirm your request.
    - If you don't want to submit a request, you can press the back button beside the "Submit a New Request" title to go back to your table of previous requests.

### Upload File

1. Click `Upload` on the navbar on the left-hand side. 
2. You can see previously uploaded files on the bottom.
    - it displays up to a max of the 5 last uploaded files
3. You can click on the name of a previously uploaded file to download the file.
4. To upload a file, input the type of medical report file that you are uploading, and then press the `Upload` button.
    - the file being uploaded must be a pdf and under 2mb, otherwise it will display messages saying you cannot upload yet


### See Results

1. Click `Results` on the navbar on the left-hand side.
2. Select which patient that you want to view the results for from the patient dropdown
3. Click a blue download button on one of the test results to download the PDF


Hover over the user profile icon on the top right of the site, and click `Log out`.


## Admin

1. Log in using the [admin credentials](#admin-credentials) and you will be taken to the admin dashboard.
Note: all of the instructions are to be done sequentially

### Create Institution

2. Click the blue `Create Institution` button on the top right hand corner of the screen
3. Enter valid information into the institution creation form and press submit

### View Institution 

4. Click on the blue `View` button for Sunnybrooke Hospital

### Edit Institution Info

5. Click on the blue `Edit` button on the right side of the hospital information
6. Edit the fields and click the blue 'Submit' button (Ensure proper information is entered due to validators)

### Delete Institution

7. Click the red `Delete` Button on the top right corner
8. Click `Yes` when prompted for confirmation

### View Doctors

9. Click on the `Doctors` tab in the left nav-bar

### Create Doctor

10. Click on the blue `Create Doctor` button 
11. Enter valid information into the doctor creation form and press next
12. Select an institution from the dropdown list
13. Click the blue `Submit` button

### View Doctor

14. Click the blue `View` button beside `John Beiber`

### Edit Doctor Info
Note: Notice the red popup message alerting you to the doctor without an institution, this is due to the doctor's institution being deleted at the beginning of this tutorial

15. Click the `X` beside the popup message
16. Click the blue `Edit` button beside the doctor info
17. Select a new institution from the dropdown under the `Institution` header
18. Click submit

### View Patients

19. Click the blue `Patients` tab in the left nav-bar

### Delete Patient

20. Click the red `Delete` button beside `Terry Brown`
21. Click `Yes` when prompted

### Create Patient

23. Click the blue `Create Patient` button in the top right corner
24. Choose the patients doctor from the dropdown list
25. Click the blue `Submit` button on the right 
26. Enter valid information into the patient creation form and press submit

### Edit Patient

27. Click the blue `View` button beside any patient in the list
28. Click the blue `Edit` button on the right of the patient information
29. Enter invalid information and press the blue `Submit` button
30. Press the `X` beside the error message popup
31. Enter valid information into the patient info fields
32. Click the blue `Submit` button on the right of the patient information
