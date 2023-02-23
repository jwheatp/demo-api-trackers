import { z } from "zod";

const UserValidator = z.object({
  email: z.string().email()
});

export default UserValidator