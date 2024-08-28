/* 
#  pages -> api -> auth -> [...nextauth].js
# se conoce como un "file name pattern" o un "dynamic route" en el contexto de Next.js
# se utiliza para crear rutas dinámicas en Next.js
# Este enfoque es útil para la creación de rutas dinámicas en aplicaciones web.
*/

import  NextAuth  from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'Ecommerce',
            credentials: {},
            async authorize(credentials) {
                const authResponse = await fetch("http://localhost:3000/api/users/login", {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(credentials),
                })

                if (!authResponse.ok) {
                    return null
                }
                const user = await authResponse.json();
                return user
            },
        }),
    ],

    secret: process.env.JWT_SECRET,
    pages: {
        signIn: "/login"
    },
    callbacks: {
        jwt: async ({ token, user }) => {
            user && (token.user = user)
            return token
        },
        session: async ({ session, token }) => {
            session.user = token.user
            return session
        }
    },
       debug: process.env.NODE_ENV === 'development',
})