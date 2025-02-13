import { mediaSans, Helevetica } from "./utils/Font";
import "./globals.css";
import { UserProvider } from "./utils/userData";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${mediaSans.variable} ${Helevetica.variable}`}
      >
        <UserProvider>
        {children}</UserProvider>
      </body>
    </html>
  );
}
