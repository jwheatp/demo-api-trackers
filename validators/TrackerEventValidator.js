import { z } from "zod";

const TrackerEventValidator = z.object({
  geoposition: z.number().array().length(2),
  user: z.string()
});

export default TrackerEventValidator