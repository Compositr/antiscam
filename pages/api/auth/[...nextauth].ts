import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../lib/prisma";

export default NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      await prisma.$connect();
      const doc = prisma.allowedUser.findFirst({
        where: {
          userId: account.providerAccountId,
        },
      });
      return !!doc;
    },
  },

  adapter: PrismaAdapter(prisma),
});
