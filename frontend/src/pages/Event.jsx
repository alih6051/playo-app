import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Container,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  Image,
  Stack,
  Tag,
  TagLabel,
  Text,
  VStack,
  Wrap,
  WrapItem,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import axios from "axios";
import isAfter from "date-fns/isAfter";
import { useSelector } from "react-redux";

const Event = () => {
  let { id } = useParams();

  const { user } = useSelector((state) => state.auth);

  const toast = useToast();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState(false);
  const [status, setStatus] = useState("");

  const handleBooking = () => {
    if (!user)
      return toast({
        title: "Please login first.",
        position: "top",
        status: "error",
        isClosable: true,
      });

    setBooking(true);
    axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/requests/send/${data._id}`,
        {},
        {
          headers: {
            Authorization: user?.token,
          },
        }
      )
      .then((res) => {
        setBooking(false);
        setData({ ...data, requests: res.data.requests });
      })
      .catch((err) => {
        setBooking(false);
        console.log(err);
      });
  };

  useEffect(() => {
    if (data) {
      if (data.requests.includes(user?.userId)) {
        setStatus("Request Sent");
      } else if (data.partcipants.map((el) => el._id).includes(user?.userId)) {
        setStatus("Joined");
      } else if (data.partcipants.length >= data.limit) {
        setStatus("Booking Full");
      } else if (!isAfter(new Date(data.date), Date.now())) {
        setStatus("Expired");
      }
    }
  }, [data]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/events/${id}`)
      .then((res) => {
        setLoading(false);
        setData(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  console.log(status);

  if (loading || !data)
    return (
      <Box marginTop={10}>
        <Loader />
      </Box>
    );

  return (
    <Container maxW="8xl" marginTop={10}>
      <VStack align="left" spacing={5} marginBottom={7}>
        <Heading fontSize={{ base: "2xl", md: "3xl" }}>{data?.title}</Heading>
        <Grid
          templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(5, 1fr)" }}
          gap={10}
        >
          <GridItem colSpan={{ base: 2, md: 3 }}>
            <Image
              src={data?.cover}
              maxH="500px"
              width="100%"
              objectFit="cover"
            />
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 2 }}>
            <Stack spacing={5}>
              <Card>
                <CardBody>
                  <Heading fontSize="lg" marginBottom={3}>
                    Timing
                  </Heading>
                  <Text>
                    {data?.startAt} - {data?.endAt}
                  </Text>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <Heading fontSize="lg" marginBottom={3}>
                    Location
                  </Heading>
                  <Text>{data?.venue}</Text>
                </CardBody>
              </Card>
              {data?.partcipants.map((el) => el._id).includes(user?.userId) && (
                <Card>
                  <CardBody>
                    <Heading fontSize="lg" marginBottom={3}>
                      Partcipants
                    </Heading>
                    <Wrap>
                      {data?.partcipants.map((el) => (
                        <WrapItem key={el._id}>
                          <Tag
                            size="lg"
                            colorScheme="green"
                            borderRadius="full"
                          >
                            <Avatar size="xs" name={el.name} ml={-1} mr={2} />
                            <TagLabel>{el.name}</TagLabel>
                          </Tag>
                        </WrapItem>
                      ))}
                    </Wrap>
                  </CardBody>
                </Card>
              )}
              <HStack spacing={5}>
                <Button
                  colorScheme="green"
                  size="lg"
                  isLoading={booking}
                  loadingText="Booking"
                  isDisabled={status}
                  onClick={handleBooking}
                >
                  Book Now
                </Button>

                {status && (
                  <Button size="lg" isDisabled={true}>
                    {status}
                  </Button>
                )}
              </HStack>
            </Stack>
          </GridItem>
        </Grid>
      </VStack>
    </Container>
  );
};

export default Event;
