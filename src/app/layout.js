import { Poppins } from "next/font/google";
import "./globals.css";
import CommonLayout from "@/components/CommonLayout";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal"],
  subsets: ["latin"],
});

export const metadata = {
  title: "JustCreate",
  description: "Find the perfect creatives for your business",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <CommonLayout>{children}</CommonLayout>
      </body>
    </html>
  );
}
