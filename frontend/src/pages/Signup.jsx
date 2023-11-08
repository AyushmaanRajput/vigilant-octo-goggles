import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  useToast,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import { createUser } from "../redux/authReducer/action";

export const Signup = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  //dispatch(createUser(userObj, toast, navigate));
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUser(formData, toast, navigate));
  };

  return (
    <Box w='min(40rem,100%)' mx='auto' my={20} border='1px solid #6666' borderRadius={'xl'} p={8}>
      <Heading textTransform={"uppercase"} mb="2rem" size="2xl">
        Sign Up
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl id="name" isRequired>
          <FormLabel>Name</FormLabel>
          <Input type="text" name="name" onChange={handleChange} />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input type="email" name="email" onChange={handleChange} />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input type="password" name="password" onChange={handleChange} />
        </FormControl>
        <Button type="submit" colorScheme="blue" mt={4}>
          Sign Up
        </Button>
      </form>
    </Box>
  );
};
