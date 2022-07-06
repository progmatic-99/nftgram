import { useState, useEffect, useCallback } from "react";
import { useToken } from "../src/store/token";
import { fetcher } from "../src/utils/fetcher";

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
    <div>
      {notifs?.map((notif) => (
        <p>{notif.owner}</p>
      ))}
    </div>
  );
};

export default Notifications;
