import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
  VStack,
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

  if (loading || !data)
    return (
      <Box marginTop={10}>
        <Loader />
      </Box>
    );

  return (
    <Container maxW="8xl" marginTop={10}>
      <VStack align="left" spacing={5}>
        <Flex justifyContent="space-between" alignItems="center">
          <Heading>{data?.title}</Heading>
          <HStack spacing={5}>
            <Button
              colorScheme="green"
              px={20}
              size="lg"
              isLoading={booking}
              loadingText="Booking"
              isDisabled={status}
              onClick={handleBooking}
            >
              Book Now
            </Button>
            {status && (
              <Text
                px={20}
                py={3}
                rounded={5}
                bg="blackAlpha.100"
                fontSize="lg"
              >
                {status}
              </Text>
            )}
          </HStack>
        </Flex>
        <Grid templateColumns="repeat(5, 1fr)" gap={10}>
          <GridItem colSpan={3}>
            <Image
              src={data?.cover}
              maxH="500px"
              width="100%"
              objectFit="cover"
            />
          </GridItem>
          <GridItem colSpan={2}>
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
                    <Text>
                      {data?.partcipants.map((el) => el.name).join(", ")}
                    </Text>
                  </CardBody>
                </Card>
              )}
            </Stack>
          </GridItem>
        </Grid>
      </VStack>
    </Container>
  );
};

export default Event;
