import { SimpleGrid, VStack } from "@chakra-ui/react";
import { useState, useEffect, useCallback, Suspense } from "react";
import Notification from "../src/components/notification";
import NewSpinner from "../src/components/spinner";
import { useToken } from "../src/store/token";
import { fetcher } from "../src/utils/fetcher";
import withAuth from "../src/components/withAuth";

const Notifications = () => {
  const [notifs, setNotifs] = useState(null);
  const token = useToken(useCallback((state) => state.accessToken));

  useEffect(() => {
    async function getNotifs() {
      const data = await fetcher({
        url: "notification",
        method: "GET",
        token: token,
      });
      setNotifs(data.notifications);
    }

    getNotifs();
  }, []);

  return (
    <VStack maxW="100vw" spacing={6}>
      <SimpleGrid columns={{ base: 1 }} spacing={{ base: 4, md: 10 }}>
        {notifs?.map((notif, index) => (
          <Suspense key={index} fallback={<NewSpinner />}>
            <Notification notif={notif} />
          </Suspense>
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default withAuth(Notifications);
