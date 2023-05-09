import { Box, Card, CardBody, Image, Tag, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import isAfter from "date-fns/isAfter";

const EventItem = ({ _id, cover, title, venue, date, limit, partcipants }) => {
  return (
    <RouterLink to={`/event/${_id}`}>
      <Card
        overflow="hidden"
        cursor="pointer"
        shadow="lg"
        _hover={{
          transform: "scale(1.03)",
          transition: "all .2s ease-in-out",
        }}
      >
        <CardBody p={0}>
          <Box position="relative" minH="50px">
            <Image src={cover} maxH="250px" w="100%" objectFit="cover" />
            {isAfter(new Date(date), Date.now()) &&
            partcipants.length < limit ? (
              <Tag size="lg" variant="solid" colorScheme="green" rounded="0">
                Bookable
              </Tag>
            ) : (
              <Tag
                size="lg"
                variant="solid"
                colorScheme="red"
                rounded="0"
                position="absolute"
                bottom="0"
                right="0"
              >
                Not Bookable
              </Tag>
            )}
          </Box>

          <Box p={3}>
            <Text fontSize="lg" fontWeight="500">
              {title}
            </Text>
            <Text fontSize="sm" noOfLines={2} marginBottom={3}>
              {venue}
            </Text>
          </Box>
        </CardBody>
      </Card>
    </RouterLink>
  );
};

export default EventItem;
