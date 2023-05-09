import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  Container,
  HStack,
  Heading,
  Stack,
  Tag,
  TagLabel,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";
import axios from "axios";
import isAfter from "date-fns/isAfter";

const Request = () => {
  const [loading, setLoading] = useState(false);
  const [accepting, setAccepting] = useState(false);
  const [data, setData] = useState([]);

  const toast = useToast();

  const { user } = useSelector((state) => state.auth);

  const handleAccept = (requestId) => {
    setAccepting(true);
    axios
      .patch(
        `${import.meta.env.VITE_BASE_URL}/requests/accept/${requestId}`,
        {},
        {
          headers: {
            Authorization: user?.token,
          },
        }
      )
      .then((res) => {
        setAccepting(false);
        toast({
          title: res.data.msg,
          position: "top",
          status: "success",
          isClosable: true,
        });
        getRequestRecieved();
      })
      .catch((err) => {
        setAccepting(false);
        console.log(err);
      });
  };

  const getRequestRecieved = () => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/requests/recieved`, {
        headers: {
          Authorization: user?.token,
        },
      })
      .then((res) => {
        setLoading(false);
        setData(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    getRequestRecieved();
  }, []);

  return (
    <Container maxW="5xl" marginTop={10}>
      <Heading fontSize="2xl" marginBottom={5}>
        Requests
      </Heading>
      {loading ? (
        <Loader />
      ) : (
        <Stack spacing={5}>
          {data?.map((item) => (
            <Card key={item._id}>
              <CardBody>
                <Stack spacing={2}>
                  <Heading fontSize="lg">{item.event.title}</Heading>
                  <Text>{item.event.venue}</Text>
                  <HStack>
                    <Text>Sent by - </Text>
                    <Tag size="lg" colorScheme="green" borderRadius="full">
                      <Avatar
                        size="xs"
                        name={item.sender.name}
                        ml={-1}
                        mr={2}
                      />
                      <TagLabel>{item.sender.name}</TagLabel>
                    </Tag>
                  </HStack>
                  <HStack>
                    <Text>Status - </Text>
                    {item.status == "pending" ? (
                      <Tag size="lg" variant="subtle" colorScheme="yellow">
                        pending
                      </Tag>
                    ) : (
                      <Tag size="lg" variant="subtle" colorScheme="green">
                        accepted
                      </Tag>
                    )}
                  </HStack>
                </Stack>
                <Box marginTop={5}>
                  {isAfter(new Date(item.event.date), Date.now()) ||
                  item.status == "accepted" ? (
                    <Button
                      size="sm"
                      colorScheme="green"
                      isDisabled={item.status == "accepted"}
                      isLoading={accepting}
                      loadingText="Accepting"
                      onClick={() => handleAccept(item._id)}
                    >
                      Accept
                    </Button>
                  ) : (
                    <Button isDisabled={true} colorScheme="red" size="sm">
                      Expired
                    </Button>
                  )}
                </Box>
              </CardBody>
            </Card>
          ))}
        </Stack>
      )}
    </Container>
  );
};

export default Request;
