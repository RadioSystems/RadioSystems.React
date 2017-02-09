# RadioSystems.React
Orchard CMS Module for React. This module allows you to write write React-Redux code in one or more custom modules that will be harvested and compiled into a single SPA style application in Orchard.

#Usage
To make use of this module. Enable it, and start writing React-Redux code in your custom module. You must place a folder called React or ReactUI at the top level of your module. The two main items that you will
need to add to make use of this module is a *routes.js* file and one or more redux reducers. (You aren't required to have any reducers, the routes file is all that is absolutely necessary, but if you build a full redux style app, you'll need reducers).
You must follow the following folder structure:

+-- MyModuleName
+-- _React
|   +--_routes
|   |    +--routes.js
|   +--_reducers
|   |   +--reducer1.js
|   |   +--reducer2.js

#Defining Routes

#Defining Reducers

#Authenticating React Routes

#Modal System

##Extending the modal System

#Custom Redux Middleware
Documentation to be added