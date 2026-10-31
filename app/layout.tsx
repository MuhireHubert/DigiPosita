import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import ServiceGate from "@/components/ServiceGate";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "DigiPosita | Digital services",
  description:
    "Access postal, delivery, business and trade services from one integrated digital platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-body">
        <AuthProvider>
          <Nav />
          <ServiceGate>{children}</ServiceGate>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
