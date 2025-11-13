import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "@/lib/api";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Usuario", type: "text" },
        password: { label: "Contraseña", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        try {
          // Llamamos a nuestra función de login
          const user = await loginUser(credentials.username, credentials.password);
          
          // Si la API responde con éxito, retornamos el usuario para guardarlo en sesión
          if (user) {
            return {
              id: user.id,
              name: user.firstName + " " + user.lastName,
              email: user.email,
              image: user.image,
            };
          }
          return null;
        } catch (error) {
          console.error("Error de login:", error);
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/login', // Le decimos a NextAuth que nuestra página de login está aquí
  },
  callbacks: {
    // Esto asegura que los datos del usuario persistan en el token JWT
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user = token.user;
      return session;
    }
  }
});

export { handler as GET, handler as POST };