import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Image,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { logoutUser } from "../../redux/authSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleLogout = () => {
    sessionStorage.removeItem("jwt_playo");
    dispatch(logoutUser());
    window.location.reload();
  };

  return (
    <>
      <Box bg="white" py={2}>
        <Container maxW="8xl">
          <Flex justifyContent="space-between" alignItems="center">
            <Box>
              <RouterLink to="/">
                <Image
                  src="https://playo-website.gumlet.io/playo-website-v2/Logo+with+Trademark_Filled.png"
                  alt="logo"
                  w="100px"
                />
              </RouterLink>
            </Box>
            <HStack spacing={6}>
              <RouterLink to="/">
                <Button variant="unstyled">Home</Button>
              </RouterLink>

              <RouterLink to="/create-event">
                <Button variant="unstyled">Create Event</Button>
              </RouterLink>

              <RouterLink to="/requested-events">
                <Button variant="unstyled">Requsted Events</Button>
              </RouterLink>

              <RouterLink to="/requests">
                <Button variant="unstyled">Requests</Button>
              </RouterLink>

              {user ? (
                <HStack divider={<StackDivider borderColor="gray.200" />}>
                  <Text>{user.name}</Text>
                  <Button size="sm" colorScheme="green" onClick={handleLogout}>
                    Logout
                  </Button>
                </HStack>
              ) : (
                <RouterLink to="/account">
                  <Button variant="unstyled">Login / SignUp</Button>
                </RouterLink>
              )}
            </HStack>
          </Flex>
        </Container>
      </Box>
      <hr />
    </>
  );
};

export default Navbar;
