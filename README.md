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