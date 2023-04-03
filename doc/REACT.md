# How to code in React ?

## Initialize a React project

*Installation:*

```bash
npm create vite@latest my-app --template react-ts
```

## What is TSX ?

TSX is a syntax extension to JavaScript. It is a superset of JavaScript that has
special syntax for elements and components. It is used with React to describe
what the UI should look like.

*Example:*

```tsx
const element = <div>
  <h1>Hello, world!</h1>
  <h2>It is {new Date().toLocaleTimeString()}.</h2>
</div>;
```

### Conditional rendering

You can use conditional rendering with the ternary operator or binary (`&&` or `||`) operator.

*Example:*

```tsx
const ternary = <div>
  <h1>Hello, world!</h1>
  {
    (new Date().getHours() < 12) ?
        <h2>Good morning !</h2> : <h2>Good afternoon !</h2>
  }
</div>;

const binary = <div>
  <h1>Hello, world!</h1>
  {
      (new Date().getHours() < 12) && <h2>Good morning !</h2>
      || <h2>Good afternoon !</h2>
  }
</div>;
```

### List rendering

*Example:*

```tsx

const data = [
  {id: 1, name: 'John', enabled: true},
  {id: 2, name: 'Jane', enabled: false},
  {id: 3, name: 'Jack', enabled: true}
];

const list = <div>
  <h1>Hello, world!</h1>
  <ul>
    {
      data
      .filter(({enabled}) => enabled)
      .map(({id, name}) => <li>{id}: {name}</li>)
    }
  </ul>
</div>;
```

## What is a component ?

A component is a function that returns a React element.

*Component declaration:*

```tsx
// src/components/MyComponent.tsx

import {FunctionComponent} from "react";

const MyComponent: FunctionComponent = () => {
  return <div>MyComponent</div>;
};

export default MyComponent;
```

*Component usage:*

```tsx
// src/App.tsx

import {FunctionComponent} from "react";
import {MyComponent} from "./components/MyComponent";

const App: FunctionComponent = () => {
  return (
      <div>
        <MyComponent/>
      </div>
  );
};

export default App;
```

## Give some props to your component

A component can receive props. Props are passed as an object to the component
function.

*Component declaration:*

```tsx
// src/components/MyComponent.tsx

import {FunctionComponent} from "react";

interface MyComponentProps {
  name: string;
}

const MyComponent: FunctionComponent<MyComponentProps> = ({name}) => {
  return <div>My name is {name}</div>;
};

export default MyComponent;
```

*Component usage:*

```tsx
// src/App.tsx

import {FunctionComponent} from "react";
import {MyComponent} from "./components/MyComponent";

const App: FunctionComponent = () => {
  return (
      <div>
        <MyComponent name="John Doe"/>
      </div>
  );
};

export default App;
```

## Use a stateful component

A stateful component is a component that has a state. A state is a variable
**shown** in the component and **updated** by the component.

**WARNING: At each change of state, the component calculates a rendering.** (it
can be source of performance issues if you don't use it properly)

*Component declaration:*

```tsx
// src/components/MyComponent.tsx

import {FunctionComponent, useState} from "react";

interface MyComponentProps {
  name: string;
}

const MyComponent: FunctionComponent<MyComponentProps> = ({name}) => {
  const [counter, setCounter] = useState<number>(0);

  return (
      <div>
        <div>My name is {name}</div>
        <div>Counter: {counter}</div>
        <button onClick={() => setCounter(counter + 1)}>Increment</button>
      </div>
  );
};
```

## Execute some code at each rendering

A component can execute some code at each rendering by using the `useEffect`
hook.

*Component declaration:*

```tsx
// src/components/MyComponent.tsx

import {FunctionComponent, useEffect, useState} from "react";

interface MyComponentProps {
  name: string;
}

const MyComponent: FunctionComponent<MyComponentProps> = ({name}) => {
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    console.log("Component rendered");
  });

  return (
      <div>
        <div>My name is {name}</div>
        <div>Counter: {counter}</div>
        <button onClick={() => setCounter(counter + 1)}>Increment</button>
      </div>
  );
};
```

## Execute some code at first rendering only

A component can execute some code at first rendering only by using `useEffect`
hook **with an empty array as dependencies**. This is useful to initialize the
state of the component with lazy initialization.

*Component declaration:*

```tsx
// src/components/MyComponent.tsx

import {FunctionComponent, useEffect, useState} from "react";

interface MyComponentProps {
  name: string;
}

const MyComponent: FunctionComponent<MyComponentProps> = ({name}) => {
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    console.log("Component rendered");
  }, []);

  return (
      <div>
        <div>My name is {name}</div>
        <div>Counter: {counter}</div>
        <button onClick={() => setCounter(counter + 1)}>Increment</button>
      </div>
  );
};
```

## Execute some code at each rendering with dependencies

A component can execute some code at each rendering with dependencies.

*Component declaration:*

```tsx
// src/components/MyComponent.tsx

import {FunctionComponent, useEffect, useState} from "react";

interface MyComponentProps {
  name: string;
}

const MyComponent: FunctionComponent<MyComponentProps> = ({name}) => {
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    console.log("Counter changed !");
  }, [counter]);

  return (
      <div>
        <div>My name is {name}</div>
        <div>Counter: {counter}</div>
        <button onClick={() => setCounter(counter + 1)}>Increment</button>
      </div>
  );
};
```

## Give data to parent component

The **ONLY WAY** to give data to a parent component is to use a callback
function as props.

*Component declaration:*

```tsx
// src/components/MyComponent.tsx
import {FunctionComponent, useState} from "react";
import App from "./App";

interface MyCustomInputProps {
  value: string;
  onChange: (value: string) => void;
}

const MyCustomInput: FunctionComponent<MyCustomInputProps> =
    ({value, onChange}) => {
      return <input value={value}
                    onChange={({target: {value}}) => onChange(value)}/>;
      // onChange={(event) => onChange(event.target.value)}/>;
    };
```

*Component usage:*

```tsx
// src/App.tsx

import {FunctionComponent, useState} from "react";
import {MyComponent} from "./components/MyComponent";

const App: FunctionComponent = () => {
  const [value, setValue] = useState<string>("");

  return (
      <div>
        <MyCustomInput value={value} onChange={setValue}/>
      </div>
  );
};
```

## Using React Router

React Router is a library that allows you to manage routes in your application.

*Installation:*

```bash
npm install react-router-dom
```

### Step 1: Declare the router

The router is declared in the `main.tsx` file as the following:

```tsx
// src/main.tsx
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import App from "./App";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
      <App/>
    </BrowserRouter>,
)
```

### Step 2: Declare the routes

The routes are declared in the `App.tsx` file as the following:

```tsx
// src/App.tsx
import {FunctionComponent} from "react";
import {Routes, Route} from "react-router-dom";
import {Home} from "./pages/Home";

const App: FunctionComponent = () => {
  return (
      <Routes>
        <Route index element={<Home/>}/>

        <Route path="test" element={<div>test</div>}/>

        // default route
        <Route path="*" element={<div>404</div>}/>
      </Routes>
  );
};
```

### Step 3: Navigate to a route

#### Using a link

Please **NEVER** use the `a` tag to navigate to a route **INSIDE YOUR
APPLICATION**. Use the `Link` or `NavLink` component from React Router Dom
instead.

```tsx
// src/components/Navbar.tsx

import {FunctionComponent} from "react";
import {Link, NavLink} from "react-router-dom";

import img from "/logo.png";

const Navbar: FunctionComponent = () => {
  return (
      <nav>
        <Link to="/">
          <img src={img} alt="Logo"/>
        </Link>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/test">Test</NavLink>
        <a href="https://external.link">External link</a>
      </nav>
  );
};
```

**Note:** The `NavLink` component is a `Link` component that adds the `active`
class to the element when the route is active.

#### Using the `useNavigate` hook

```tsx
// src/components/MyComponent.tsx

import {FunctionComponent} from "react";
import {useNavigate} from "react-router-dom";

const MyComponent: FunctionComponent = () => {
  const navigate = useNavigate();

  return (
      <button onClick={() => navigate("/test")}>Go to test</button>
  );
};
```

## Parametrized routes

### Step 1: Declare the route

```tsx
// src/App.tsx

import {FunctionComponent} from "react";
import {Routes, Route} from "react-router-dom";
import {Home} from "./pages/Home";

const App: FunctionComponent = () => {
  return (
      <Routes>
        <Route index element={<Home/>}/>

        <Route path="user/:id" element={<User/>}/>

        <Route path="*" element={<div>404</div>}/>
      </Routes>
  );
};
```

### Step 2: Get the parameter

```tsx
// src/pages/User.tsx

import {FunctionComponent} from "react";

const User: FunctionComponent = () => {
  const {id} = useParams();

  return (
      <div>
        <h1>User {id}</h1>
      </div>
  );
};
```

## Using React Query

React Query is a library that allows you to manage data fetching in your application.

*Installation:*

```bash
npm install react-query
```

### Step 1: Declare the query

```tsx
// src/pages/Home.tsx

import {FunctionComponent} from "react";
import {useQuery} from "react-query";

const Home: FunctionComponent = () => {
  const {data, isLoading} = useQuery("users", () => fetch("/api/users").then(res => res.json()));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
      <div>
        {data.map((user) => (
            <div key={user.id}>{user.name}</div>
        ))}
      </div>
  );
};
```
