import {
  Box,
  Button,
  Collapse,
  Container,
  Flex,
  HStack,
  Image,
  Stack,
  StackDivider,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { logoutUser } from "../../redux/authSlice";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleLogout = () => {
    sessionStorage.removeItem("jwt_playo");
    dispatch(logoutUser());
    window.location.reload();
  };

  const { isOpen, onClose, onToggle } = useDisclosure();

  return (
    <>
      <Box bg="white" py={2} position="sticky" top="0" zIndex="100">
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
            <HStack spacing={6} display={{ base: "none", md: "flex" }}>
              <RouterLink to="/">
                <Button variant="link" color="black">
                  Home
                </Button>
              </RouterLink>

              <RouterLink to="/create-event">
                <Button variant="link" color="black">
                  Create Event
                </Button>
              </RouterLink>

              <RouterLink to="/requested-events">
                <Button variant="link" color="black">
                  Requsted Events
                </Button>
              </RouterLink>

              <RouterLink to="/requests">
                <Button variant="link" color="black">
                  Requests
                </Button>
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
                  <Button variant="link" color="black">
                    Sign In
                  </Button>
                </RouterLink>
              )}
            </HStack>

            <Button
              variant="unstyled"
              display={{ base: "flex", md: "none" }}
              onClick={onToggle}
            >
              {isOpen ? (
                <CloseIcon fontSize="17px" />
              ) : (
                <HamburgerIcon fontSize="24px" />
              )}
            </Button>
          </Flex>
        </Container>
        <Collapse in={isOpen} animateOpacity>
          <Container maxW="8xl" mt="3">
            <Stack spacing={5}>
              <RouterLink to="/" onClick={onClose}>
                <Button variant="link" color="black">
                  Home
                </Button>
              </RouterLink>

              <RouterLink to="/create-event" onClick={onClose}>
                <Button variant="link" color="black">
                  Create Event
                </Button>
              </RouterLink>

              <RouterLink to="/requested-events" onClick={onClose}>
                <Button variant="link" color="black">
                  Requsted Events
                </Button>
              </RouterLink>

              <RouterLink to="/requests" onClick={onClose}>
                <Button variant="link" color="black">
                  Requests
                </Button>
              </RouterLink>

              {user ? (
                <HStack divider={<StackDivider borderColor="gray.200" />}>
                  <Text>{user.name}</Text>
                  <Button size="sm" colorScheme="green" onClick={handleLogout}>
                    Logout
                  </Button>
                </HStack>
              ) : (
                <RouterLink to="/account" onClick={onClose}>
                  <Button variant="link" color="black">
                    Sign In
                  </Button>
                </RouterLink>
              )}
            </Stack>
          </Container>
        </Collapse>
      </Box>
      <hr />
    </>
  );
};

export default Navbar;
