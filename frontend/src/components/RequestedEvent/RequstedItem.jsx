import {
  Card,
  CardBody,
  Heading,
  Image,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const RequstedItem = ({ event, status }) => {
  return (
    <RouterLink to={`/event/${event._id}`}>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "200px" }}
          src={event.cover}
        />

        <Stack>
          <CardBody>
            <Heading size="md">{event.title}</Heading>

            <Text py="2">{event.venue}</Text>
            {status == "pending" ? (
              <Tag colorScheme="yellow" size="lg">
                Pending
              </Tag>
            ) : (
              <Tag colorScheme="green" size="lg">
                Accepted
              </Tag>
            )}
          </CardBody>
        </Stack>
      </Card>
    </RouterLink>
  );
};

export default RequstedItem;
