import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, auth } = NextAuth({
  trustHost: true,
  providers: [Google],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, profile }) {
      if (profile && typeof profile === "object") {
        const googleProfile = profile as { sub?: string; name?: string; email?: string };
        if (googleProfile.sub) token.sub = googleProfile.sub;
        if (googleProfile.name) token.name = googleProfile.name;
        if (googleProfile.email) token.email = googleProfile.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        if (typeof token.sub === "string") session.user.id = token.sub;
        if (typeof token.name === "string") session.user.name = token.name;
        if (typeof token.email === "string") session.user.email = token.email;
      }
      return session;
    },
  },
});

