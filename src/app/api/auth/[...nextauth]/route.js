import NextAuth from "next-auth";
import { authOptions } from "@/src/lib/authOption";

const handler = NextAuth.default(authOptions);

export { handler as GET, handler as POST };

// import { handlers } from "@/src/lib/authOption";
// export const {GET, POST } = handlers;
