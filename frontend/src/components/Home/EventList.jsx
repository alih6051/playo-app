import { SimpleGrid } from "@chakra-ui/react";
import Loader from "../Loader";
import EventItem from "./EventItem";

const EventList = ({ data, loading }) => {
  if (loading) return <Loader />;

  return (
    <SimpleGrid columns={3} spacing={10}>
      {data?.map((item) => (
        <EventItem key={item._id} {...item} />
      ))}
    </SimpleGrid>
  );
};

export default EventList;
