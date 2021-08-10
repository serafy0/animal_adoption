import {useEffect, useState} from "react";
import Nav from "./components/Nav";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Test from "./components/Test";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import {SnackbarProvider} from "baseui/snackbar";
import Dashboard from "./components/Dashboard";


async function  fetchUser(setUserData){
  const token =localStorage.getItem("token")
  console.error(token)
  const settings = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await fetch("http://localhost:3001/get-user",
      settings)
if(res.ok) {
  const newUserData = await res.json()
  console.error(res)
  console.error(newUserData)

  setUserData(newUserData)
}else{
  console.error(res)
  return {}
}

}



function App() {
  const [userData, setUserData] = useState({});
  useEffect(async()=>{
    await fetchUser(setUserData)
  },[])
  return (
      <SnackbarProvider>

      <div className="App">
      <Router>
        <Route path="/">
          <Nav user={userData} setUserData={setUserData}/>

        </Route>

        <Route exact path="/">

          <Home {...userData} />

        </Route>
        <Route path="/sign-in">
          <SignIn handleFetch={setUserData} />
        </Route>
        <Route path="/sign-up">
          <SignUp handleFetch={setUserData} />
        </Route>
        <Route path="/dashboard">
          <Dashboard handleFetch={setUserData} />
        </Route>
      </Router>
    </div>
      </SnackbarProvider>

  );


}

export default App;
