# RadioSystems.React
Orchard CMS Module for React. This module allows you to write write React-Redux code in one or more custom modules that will be harvested and compiled into a single SPA style application in Orchard.

#Setup and Usage
Once you download or install this module and include it in your orchard modules folder. You must take the followings steps to use it

1. Ensure NodeJS and NPM are installed on your system. [Download Here](https://nodejs.org/en/)

2. In the module src, there is a **Templates** folder. Copy the *package.json* file and *webpack.config.js* to the Orchard.Web folder.

3. If you are doing local Orchard development, you must configure you Orchard instance to run at the root of the local site instead of the default http://localhost:30321/OrchardLocal

3. Start Orchard, and enable the *RadioSystems.React* module.

4. Install node modules by navigating to the Orchard.Web folder and executing

    ```
    npm install
    ```

5. Install webpack globally
    ```
    npm install -g webpack
    ```

6. To build the SPA using webpack, you can either use webpack directly via the command line tool of your choice, or you can download the [Webpack Task Runner for VS](https://marketplace.visualstudio.com/items?itemName=MadsKristensen.WebPackTaskRunner)
   - To run it via command line, just navigate to the Orchard.Web folder and execute *webpack*. You can also run *webpack --watch* to recompile on change.
   - If you download the task runner, follow the instructions listed there. You can also bind the webpack task to build events in VS if you use the task runner.
   - either of these options will build an *Orchard.React.js* file and *Orchard.React.js.map* file. You don't have to do anything with these, they are already loaded by the module.

7. Login to Orchard and open http://localhost:30321/react to see the Orchard React app in action. **You'll have to be authenticated**

8. **NOTE:** In order to use the built in Alert, Confirm, and modal system you'll have to include a copy of jQuery and Bootstrap in your theme. 

#Writing React code in your own module

To write code in your own module, you must place a folder called React or ReactUI at the top level of your module. The two main items that you will
need to add to make use of this module is a *routes.js* file and one or more redux reducers. (You aren't required to have any reducers, the routes file is all 
that is absolutely necessary, but if you build a full redux style app, you'll need reducers).
You must follow the following folder structure:

```
+-- MyModuleName
+-- React
|   +--routes
|   |    +--routes.js
|   +--reducers
|   |   +--reducer1.js
|   |   +--reducer2.js
```

#Defining Routes
To define your custom module's react routes, just create the *routes.js* file above and declare your routes with react router:

```
import React from "react"
import {Route, IndexRoute} from "react-router"
import MyComponent from "../containers/MyComponent"

export default(
    <Route path="/mymodule">
        <IndexRoute component={MyComponent} />
        <Route path="mycomponent" />
    </Route>
);
```
In the above example, your component would be found by hitting [http://localhost:30321/react/mymodule/mycomponent]()

#Authenticating React Routes
If you wish to authorize your react routes based on orchard permissions, you can export your routes as a function like so, and your function will be passed an authorize function as a parameter.
You can use this function to authenticate routes like so:

```
import React from "react"
import {Route, IndexRoute} from "react-router"
import MyComponent from "../containers/MyComponent"

export default function(orchardAuthorize){
    function authorize(permission, replace){
        if(!orchardAuthorize(permission)){
            replace("/users/account/accessdenied");
        }
    }
    return (
        <Route path="/mymodule">
            <IndexRoute component={MyComponent} />
            <Route path="mycomponent" onEnter={(nextState, replace) => {authorize("MY_MODULE_PERMISSION", replace)}}/>
        </Route>
    )
};
```
where "MY_MODULE_PERMISSION" is a string that corresponds to the name of an Orchard permission.

#Defining Reducers
To define reducers in your custom module, just write Reducers and put them in the *reducers* folder as mentioned in the folder structure above.  You must follow a naming convention of
{descriptor}Reducer.js. **NOTE** that whatever the *descriptor* value is, is what will appear in the redux store state. So if you have a reducer called *car*Reducer.js. Then your store state
for that reducer will be **car**. So, for example, in a call to the react-redux connect function, you can expect **car** to be part of state.

```
import React, {Component} from "react";
import {connect} from "react-redux";

class MyContainer extends Component{
    ....
}

function mapStateToProps(state){
    return {
        car: state.car
    }
}

export default connect(mapStateToProps)(MyContainer);
```

Example reducer:

```
import initialState from "../initialState";

export default function(state = initialState.myPieceOfState, action){
    switch(action.type){
        case "MY_ACTION":
            const newState = Object.assign({}, state);
            state.newValue = "Example";
            return newState;
        default:
            return state;
    }
}
```

#State objects made available by default
Be default, the React module makes a  user object a piece of state in the redux store. This user state object has the form: 

```
user = {
    id: 1,
    username: "myuser@mysite.com",
    roles: [], //list of orchard roles assigned to logged in user
    permissions: [] //list of orchard permission belonging to logged in user
}
```

#Actions made available as props
The React module also makes a handful of actions available via props to any top level container components. These actions are

- showAlert(alertText)
- showConfirm(confirmText, confirmFunction, cancelFunction?)
- showModal(modalType, modalProps) 
    -this function is described further in the *Extending the modal system* section below
- hideModal()

Example container component using default props:

```
import React, {Component} from "react";
import AnotherComponent from "../components/AnotherComponent";

class MyContainer extends Component{
    componentDidMount(){
        this.props.showAlert("I Mounted!");
    }
    render(){
        return (
            <div>
                Example Container!
                <AnotherComponent showConfirm={this.props.showConfirm}/> //pass showConfirm prop on to another component
            </div>
        );
    }
}

export default MyContainer;
```

#Modal System
Documentation to be added

##Extending the modal System
Documentation to be added

#Setting the base route for React app
Documentation to be added

#Custom Redux Middleware
Documentation to be added