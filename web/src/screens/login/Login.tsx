import React, { ReactElement, useState, ChangeEvent } from "react";
import TextField from "../../component/text-field/TextField";
import { validateUserName } from "../../utils/utils";
import "./Login.scss";
import Button from "../../component/button/Button";
import Loader from "./../../component/loader/Loader";
import { useMutation } from "@apollo/react-hooks";
import {
  MutationLoginUserArgs,
  GenericResponse
} from "../../utils/gql/models/types";
import { LOGIN } from "../../utils/gql/queries";
import Toggle from "../../component/toggle/Toggle";
import NavigationToggle from "../../component/navigation-toggle/NavigationToggle";
import { ButtonProps } from "./../../component/button/Button";
import withLoader from "./../../component/HOC/loader/LoaderHOC";
interface Props {
  onLogin: () => void;
}

export default function Login(props: Props): ReactElement {
  const [username, setUserName] = useState("");
  const [buttonType, setButtontype] = useState("button");
  const [gender, setGender] = useState<string>("f");
  const [loginError, setError] = useState<string>("");

  const [loginResponse, { data, error, loading }] = useMutation<
    { loginResponse: GenericResponse },
    { userName: string }
  >(LOGIN);

  /**
   * handle any changes to the userName
   * @param e is change event on the input element.
   */
  const handleUserNameChange: (
    e: ChangeEvent<HTMLInputElement>
  ) => void = e => {
    const userNameValue = e.target.value;
    const { valid, error } = validateUserName(userNameValue);
    if (!valid) {
      setError(error);
    }
    setUserName(userNameValue.replace(" ", ""));
  };

  const handleSubmission: (
    e: React.FormEvent<HTMLFormElement>
  ) => void = async e => {
    setButtontype("loading");
    e.preventDefault();
    const result = await loginResponse({
      variables: {
        userName: username
      }
    });
    if (error) {
      console.log(error);
    }
    if (result) {
      props.onLogin();
    }
    console.log(result);
  };

  const handleGender: (e: Event) => void = e => {
    if (gender === "f") {
      setGender("m");
    } else {
      setGender("f");
    }
  };

  const ButtonWithLoader = withLoader<ButtonProps>(
    Button,
    () => {
      console.log(`Loading is ${loading}`);
      return !loading;
    },
    {
      size: "normal"
    }
  );

  return (
    <div className="login-container">
      <div className="login-form-container">
        <div className="login-form-element login-form--welcome header-non-menu-primary">
          Welcome
        </div>
        <form
          name="login-form"
          className="login-form"
          onSubmit={handleSubmission}
        >
          <TextField
            label="username"
            inputClassName="body-primary"
            className="login-form-element login-form--username body-secondary"
            value={username}
            onChange={handleUserNameChange}
            inputMode="text"
            spellCheck={false}
            containerProps={{
              "data-testid": "username",
              id: "login-form--username"
            }}
          />
          <div className="login-form-element">
            <NavigationToggle
              options={["Female", "Male"]}
              onChange={handleGender}
              size="small"
              optionClassNames={["body-primary"]}
            />
          </div>
          <div className="login-form-element">
            {buttonType === "button" ? (
              // <Button
              //   containerClass=""
              //   appearance={"primary"}
              //   size="normal"
              //   type="submit"
              // >
              //   Login
              // </Button>
              <ButtonWithLoader
                appearance="primary"
                containerClass=""
                size="normal"
                type="submit"
              >
                Login
              </ButtonWithLoader>
            ) : (
              <Loader size="normal" />
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
