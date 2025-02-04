import { Metadata } from "next";

export const metadata:Metadata ={
    title :'Create account here',
    description:'Please create your account here ( change this later ) '
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
