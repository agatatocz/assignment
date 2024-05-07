import type { Metadata } from "next";
import "./globals.css";

import { mswServer } from "@/mocks/mswServer";
mswServer.listen();
// import { setupMocks } from "@/mocks";
// import("@/mocks").then(({ setupMocks }) => {
// setupMocks();
// });

export const metadata: Metadata = {
  title: "Assignment",
  description: "Assignment description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
