import { Box, Card, CardBody, Image, Tag, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import isAfter from "date-fns/isAfter";

const EventItem = ({ _id, cover, title, venue, date, limit, partcipants }) => {
  return (
    <RouterLink to={`/event/${_id}`}>
      <Card
        overflow="hidden"
        cursor="pointer"
        _hover={{
          transform: "scale(1.03)",
          transition: "all .2s ease-in-out",
        }}
      >
        <CardBody p={0}>
          <Image src={cover} maxH="250px" w="100%" objectFit="cover" />
          <Box p={3}>
            <Text fontSize="lg" fontWeight="500">
              {title}
            </Text>
            <Text fontSize="sm" noOfLines={2} marginBottom={3}>
              {venue}
            </Text>
            {isAfter(new Date(date), Date.now()) &&
            partcipants.length < limit ? (
              <Tag size="lg" variant="solid" colorScheme="green">
                Bookable
              </Tag>
            ) : (
              <Tag size="lg" variant="solid" colorScheme="red">
                Not Bookable
              </Tag>
            )}
          </Box>
        </CardBody>
      </Card>
    </RouterLink>
  );
};

export default EventItem;
