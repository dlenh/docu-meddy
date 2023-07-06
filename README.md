# Docu-Meddy
A full-stack web application that allows users to create accounts and log the medicine they are taking. 

**Link to project** Coming soon

![Screenshot of website]

## How It's Made:

**Tech used:** Javascript, MongoDB, Express.js, EJS, Node.js, Passport.js, Bootstrap, CSS

This application was built using the MVC (model - view - controller) structure. MongoDB served as the model (database) and Mongoose was used to structure the object data. Embedded Javascript (EJS) was used for the view (client). Express and Node performed the functional programming that bridged communication between client and database. Passport was used for authentication purposes, and Bootstrap for a more palatable user interface. A public API (National Library of Medicine from the National Institute of Health) was used to supply users with drug information. User-entered drug names have to match drugs in the API in order for them to be added to the user's medicine cabinet. Users are also able to document side effects they have experienced.

## Lesson Learned:

API fetches can be made in Node.js by requiring node-fetch. The returned JSON data can then be parsed to display whatever information is desired from the API. Off-the-shelf middleware like Passport for authentication can come in handy when piecing together different aspects of an application. Others like the CSS framework Bootstrap can serve has a foundation for additional CSS customizations. 

## Optimizations:

If the application were to be on a grander scale and required complex routing and heavy data-driven components, then React would be better than EJS for the view portion of MVC. Other optimizations include utilizing other strategies (Google, Twitter, Facebook, etc.) for login using Passport. Email verification can also be added to prevent users from creating accounts with fake email addresses; users would have to click on a verification link sent to the email address they've provided before accessing the application. 