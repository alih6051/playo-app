import { Container, Heading, Stack } from "@chakra-ui/react";
import RequstedItem from "../components/RequestedEvent/RequstedItem";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import axios from "axios";
import { useSelector } from "react-redux";

const RequstedEvent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/requests/sent`, {
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
  }, []);

  return (
    <Container maxW="5xl" marginTop={10}>
      <Heading fontSize="2xl" marginBottom={5}>
        Requested Events
      </Heading>
      {loading ? (
        <Loader />
      ) : (
        <Stack spacing={5}>
          {data?.map((item) => (
            <RequstedItem key={item._id} {...item} />
          ))}
        </Stack>
      )}
    </Container>
  );
};

export default RequstedEvent;
