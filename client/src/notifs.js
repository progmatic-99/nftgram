import { BASE_URL } from "./utils/urls";

const evtSource = new EventSource(BASE_URL);

export default evtSource;
