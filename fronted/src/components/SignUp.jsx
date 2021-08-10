import { useState } from "react";
import { useHistory } from "react-router-dom";
import {FormControl} from "baseui/form-control";
import {Input} from "baseui/input";
import {Button} from "baseui/button";

function SignUn({ handleFetch }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    id:""
  });
  let history = useHistory();
  const handlChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handlSingUn = async (e) => {
    e.preventDefault();
    const settings = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };
    try {
      const fetchResponse = await fetch(
        `http://localhost:3001/sign-up`,
        settings
      );
      const data = await fetchResponse.json();
      console.log(data);
      // handleFetch(data.user);
      history.push("/");
      return data;
    } catch (e) {
      return e;
    }
  };
  return (
    <div>
      <form onSubmit={handlSingUn}>
        <FormControl label="first name">
          <Input
              type="text"
              name="firstName"
              required
              value={user.firstName}
              onChange={handlChange}
          />
        </FormControl>
        <FormControl label="last name">
          <Input
              type="text"
              name="lastName"
              required
              value={user.lastName}
              onChange={handlChange}
          />
        </FormControl>
        <FormControl label="email">
          <Input
              type="email"
              name="email"
              required
              value={user.email}
              onChange={handlChange}
          />
        </FormControl>
        <FormControl label="password">
          <Input
              type="password"
              name="password"
              required
              value={user.password}
              onChange={handlChange}
          />
        </FormControl>



        <Button type="submit">Submit</Button>
      </form>

    </div>
  );
}

export default SignUn;
