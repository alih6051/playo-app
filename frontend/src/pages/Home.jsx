import { Box, Button, Container, Flex, Input, Select } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import EventList from "../components/Home/EventList";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);
  const [params, setParams] = useState({
    q: "",
  });
  const [loading, setLoading] = useState(false);

  const handleFilter = (e) => {
    if (e.target.value == "") {
      let temp = { ...params };
      delete temp.state;
      return setParams(temp);
    }

    setParams({ ...params, state: e.target.value });
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/events`, { params: params })
      .then((res) => {
        setLoading(false);
        setData(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [params]);

  return (
    <Box>
      <Box py={4}>
        <Container maxW="8xl">
          <Flex justifyContent="space-between">
            <Flex w="67%">
              <Input
                placeholder="Search by venue name"
                value={params.q}
                onChange={(e) => setParams({ ...params, q: e.target.value })}
              />
            </Flex>
            <Select placeholder="All States" w="30%" onChange={handleFilter}>
              <option value="Delhi">Delhi</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Pune">Pune</option>
              <option value="Mumbai">Mumbai</option>
            </Select>
          </Flex>
        </Container>
      </Box>
      <hr />
      <Container maxW="8xl" marginTop={10}>
        <EventList data={data} loading={loading} />
      </Container>
    </Box>
  );
};

export default Home;
