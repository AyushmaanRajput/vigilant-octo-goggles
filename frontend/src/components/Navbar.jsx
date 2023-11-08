import { Box, Link, Flex, Text, Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { logoutUser } from "../redux/authReducer/action";

const Navbar = () => {
  const isAuth = useSelector((store) => store.authReducer.isAuth);
  const token = useSelector((store) => store.authReducer.token);

  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  function logoutHandler() {
    dispatch(logoutUser(token, toast, navigate));
  }
  return (
    <Flex
      as="nav"
      alignItems="center"
      justifyContent="space-between"
      padding="1rem"
      background="#40739e"
      color="white"
    >
      <Flex align="center" mr={5}>
        <Text fontSize="xl">URL | Shortner</Text>
      </Flex>
      <Box>
        <Link as={RouterLink} to="/" mr={4}>
          Home
        </Link>
        <Link as={RouterLink} to="/dashboard" mr={4}>
          Dashboard
        </Link>
        {isAuth ? (
          <Button onClick={logoutHandler}>Logout</Button>
        ) : (
          <>
            <Link as={RouterLink} to="/login" mr={4}>
              Login
            </Link>
            <Link as={RouterLink} to="/signup">
              Signup
            </Link>
          </>
        )}
      </Box>
    </Flex>
  );
};

export default Navbar;
