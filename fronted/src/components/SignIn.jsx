import { useState } from "react";
import { useHistory } from "react-router-dom";
import {Check, DeleteAlt} from "baseui/icon";
import {
  useSnackbar,
} from 'baseui/snackbar';
import {FormControl} from "baseui/form-control";
import {Input} from "baseui/input";
import {Button} from "baseui/button";

function SignIn({ handleFetch, handleToken }) {
  const {enqueue} = useSnackbar();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();
  const handlChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handlSingIn = async (e) => {
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
        `http://localhost:3001/sign-in`,
        settings
      );
      const data = await fetchResponse.json();
      // handleToken(data.token)
      handleFetch(data);
      localStorage.setItem("token",data.token)


      history.push("/");
      enqueue({
        message: 'log in successful',
        startEnhancer: ({size}) => <Check size={size} />,
      })

      return data;
    } catch (e) {
      enqueue({
        message: 'failed to login',
        startEnhancer: ({size}) => <DeleteAlt size={size} />,
      })

      return e;
    }
  };
  return (
    <div>
      <form onSubmit={handlSingIn}>
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

export default SignIn;
