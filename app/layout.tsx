import { mediaSans, Helevetica } from "./utils/Font";
import "./globals.css";


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
        {children}
      </body>
    </html>
  );
}
