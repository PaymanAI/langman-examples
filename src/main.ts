import { server } from "./server";
import { initializeGraph } from "./graph";

server.listen(3000, () => console.log("Starting server on port 3000"));
