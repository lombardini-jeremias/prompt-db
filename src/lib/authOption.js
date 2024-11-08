import GoogleProvider from "next-auth/providers/google";
import User from "../models/user"; // Assuming User is a Mongoose model
import { connectToDB } from "../utils/database"; // Your MongoDB connection utility

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider.default({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // Attach the user's MongoDB ID to the session object
      if (token.id) {
        session.user.id = token.id;
      }
      return session;
    },

    async signIn({ profile }) {
      try {
        await connectToDB();

        // Check if the user already exists in the database
        const userExists = await User.findOne({ email: profile.email });

        // If the user doesn't exist, create a new one
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(/\s+/g, "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true; // Allow sign-in
      } catch (error) {
        console.error("Error in sign-in callback:", error);
        return false; // Deny sign-in on error
      }
    },

    async jwt({ token, profile }) {
      // If this is the first sign-in, attach the user's MongoDB ID to the JWT token
      if (profile) {
        await connectToDB();
        const user = await User.findOne({ email: profile.email });
        if (user) {
          token.id = user._id.toString(); // Attach MongoDB ID to the token
        }
      }
      return token;
    },
  },
};
