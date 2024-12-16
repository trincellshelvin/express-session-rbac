# express-mongodb-advanced
## Run Server:

In the terminal, type in npm run dev to start the server. In your browser of choice, enter //localhost/3000 for it to run the app on the server as outlined with the port 3000.

## Edit the Routes:

Each app.get (....) is a route to a different page that can be edited to go to the specific page. The Res is the response that the page should receive and pull up in the browser when the page is navigated to. With json type requests only being accessible via thunderclient or the app postman [click here for postman](https://www.postman.com/explore)

To use postman, make sure that you have the desired request option selected from the drop down whether it is Get, Post, Delete, Put, Patch, Head, or Options (see screenshot of listed options). 

![Postman Options Dropdown](/postman%20options.png)

## Post User
In order to post a user to the database, switch the dropdown to POST, and you would use this link: http://localhost:3000/users. The body of your request needs to be as follows:

{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 25
}

The body request doesn't have to include the active status per the coding, it can be used without it. 

![Post User Postman](/images/postmanuserpost.png)
![Post User MongoDB](/images/mongodbpostuserentry.png)

## Get User
As the opposite, the request body is not needed in order for you to retrieve the users of the data base. You would change the drop down to GET with the same link as above. 

![Postman Get User](/images/postmangetusers.png)
![MongoDB Get User](/images/mongodbpostuserentry.png)

## Get User Active
To retrieve the activity status of the user. You would use this link: http://localhost:3000/users/active with the drop down set to get. This will show you the active status of the user. 

![Postman Active User Entry](/images/postmangetactiveusers.png)
![MongoDB Active User Entry](/images/mongodbpostuserentry.png)

## Put User ID
To update the existing entry of a user. You can get the user ID from the database and use the following link: http://localhost:3000/users/<user-id>.

![Postman Update User ID](/images/postmanputuserid.png)
![MongoDB Update User ID](/images/mongodbputuserid.png)

## Put User ID Deactivate
With the user ID retrieved from the database, you would used the following link to deactivate a user: http://localhost:3000/users/<user-id>/deactivate.

![Postman Put Deactivate User](/images/postmanputdeactivateuser.png)
![MongoDB Deactivate User](/images/mongodbputdeactivateuser.png)

## Delete User ID
Same with deactivating a user, you would need to retrieve the userID from the database and use the following link to delete a user document from the database: http://localhost:3000/users/<user-id>.

![Postman Delete User](/images/postmanddeleteuser.png)
![MongoDB Delete User](/images/mongodbdeleteuser.png)

## Post Register User with Password Hashing-Bcrypt

When it comes to registering a user via postman, please use the following link and Body-raw in json format to post the user: http://localhost:3000/register

{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "password123"
}

If done correctly, the postman will submit to the database the entered details in a hashingPassword for as shown in the screenshots below:

![Postman Post Bcrypt with Password Registration](/images/postmanpostregister.png)
![MongoDB Post Bcrypt with Password Registration](/images/mongodbpostregister.png)

## Register User (assignment 4) with Login User

Register user with the following link: http://localhost:3000/register with the following body in raw json form: 

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

This should return the following screenshots:
![Registered User Postman](/images/postmanuserregistrationwithlogin.png)
![Registered User MongoDB](/images/mongodbuserregistrationwithlogin.png)

If all goes well, you should be able to now use this link:  http://localhost:3000/login with the following body in raw json form to login the same user with the proper message as it appears in the screenshot:

{
  "email": "john@example.com",
  "password": "password123"
}

![Logged in User Postman](/images/postmanloggedinuser.png)

## Debugging and Testing

In this project, within the tests folder you will find async functions to test your database coding and records to verify via boolean whether the files are broken or not. This will sometimes happen when registration is taking place and the Bcrypt is being duplicated in the background (you will not see these entries in your database, however testing will always return these entries as false meaning that they are broken). This will require with the testBcrypt.js that you have both the Bcrypt and a user profile password for testing to get the boolean responses in the terminal with node and the file name. 

![testBcrypt.js](/images/testsbcryptboolean.png)
![hashPassword.js](/images/testshashPassword.png)
![Terminal JWT Randomizer](/images/terminalcommandrandomjwt.png)

## Login, Dashboard, and Admin User and Admin Profiles

Respectfully you would use the links as follows to register the user as with any registration above. The roles in the users middleware along with auth and the routes for register and login must be properly defined for them to be able to work correctly. By having them defined, this process means that profiles for both regular users and admins can be contained within the same database instead of separate ones based upon the user profile type. 

JWT or Jason Web Tokens are setup at random. You can either preset your own as you wish utilizing a self format  of numbers, letters, and special characters, use an online randomizer or the terminal in your project with the following command: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))". These tokens can start with the basic 32 bit format up to a 512 bit format. Here are a few links to online randomizers that can help with setting up these tokens for you. Remember to include these in your private .env file and not to share them publicly.
(JWTSecret.com)(https://jwtsecret.com/generate) or [randomkeygen.com](https://randomkeygen.com/)

Here are the screenshots of what to expect with testing of the user and admin routes, middleware for authentication/authorization, as well as the roles middleware. 

To test these routes: http://localhost:3000/dashboard and http://localhost:3000/admin

You would need the Authorization JWT Token that you will receive via postman after successful (200ok) login of the user. If coded within your project the role defaults are not necessary at login unless specified required in the coding, but must be defined within the code to differentiate between the login roles in the user interface. At registration, the roles must be specified for the authentication and authorization middleware purposes. This is the json body required for registration of both as a POST using thunderclient or postman using http://localhost:3000/register:

{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "adminpassword123",
  "role": "admin"
}

{
  "name": "Regular User",
  "email": "user@example.com",
  "password": "userpassword123",
  "role": "user"
}

With login to retrieve the JWT via POST, you will need to use this as a json raw body respectfully for both the admin and regular user for testing via this link: http://localhost:3000/login
{
  "email": "admin@example.com",
  "password": "adminpassword123"
}
{
  "email": "user@example.com",
  "password": "userpassword123"
}

Now to test the GET with http://localhost:3000/admin. You will need to use the header within postman to enter the following Authorization: Bearer <your_jwt_token>. To get the <your_jwt_token> comes from the successful login as above with both profiles. This token received will be used as the Bearer _____ <token there in the value filed>. Same setup with testing of the dashboard via this link: http://localhost:3000/dashboard.
![MongoDB Registered Admin](/images/mongodbregisteradminuser.png)
![Postman Registered Admin](/images/postmanadminregister.png)
![JWT AdminAccess](/images/postmanadmingetjwtaccess.png)
![Login JWT Admin](/images/postmanloginadminjwt.png)
![Postman Register Admin](/images/postmanregisteradminuser.png)
![MongoDB Registered User](/images/mongodbregisterregularuser.png)
![Admin Test Regular User](/images/postmanadminregularuseraccessdenied.png)
![Login JWT User](/images/postmanloginregularuserjwt.png)
![Postman Register Regular User](/images/postmanregisterregularuser.png)
![Dashboard Test User](/images/postmantestdashboarduser.png)
![Dashboard Test Admin](/images/postmantestdashboardadmin.png)
