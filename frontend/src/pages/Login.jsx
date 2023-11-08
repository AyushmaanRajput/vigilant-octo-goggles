import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Heading,
  useToast,
  Stack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { loginUser } from "../redux/authReducer/action";

export const Login = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const isAuth = useSelector((store) => store.authReducer.isAuth);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    if (email && password) {
      let userObj = { email, password };
      dispatch(loginUser(userObj, toast, navigate));
    }
  };

  //dispatch(loginUser(userObj, toast, navigate));

  function navigateToHome() {
    navigate("/");
  }

  return (
    <Box
      w="min(40rem,100%)"
      mx="auto"
      my={20}
      border="1px solid #6666"
      borderRadius={"xl"}
      p={8}
    >
      {isAuth ? (
        navigateToHome()
      ) : (
        <>
          <Heading textTransform={"uppercase"} mb="2rem" size="2xl">
            Login
          </Heading>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement px={2}>
                    <Button
                      alignSelf="center"
                      variant="outline"
                      size={"md"}
                      onClick={handlePasswordVisibility}
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Button type="submit" colorScheme="blue" width="min-content">
                Login
              </Button>
            </Stack>
          </form>
        </>
      )}
    </Box>
  );
};
