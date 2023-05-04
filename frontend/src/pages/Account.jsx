import {
  Card,
  CardBody,
  Center,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import Login from "../components/Account/Login";
import SignUp from "../components/Account/SignUp";

const Account = () => {
  return (
    <Center marginTop={10}>
      <Card w="lg">
        <CardBody>
          <Tabs colorScheme="green">
            <TabList>
              <Tab>Login</Tab>
              <Tab>SignUp</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <SignUp />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </CardBody>
      </Card>
    </Center>
  );
};

export default Account;
