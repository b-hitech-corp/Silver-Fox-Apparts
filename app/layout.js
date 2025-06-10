import Footer from "./_components/Footer";
import Navbar from "./_ui/Navbar";
import "./styles.css";

import { Roboto } from "next/font/google";
import { AuthProvider } from "./_context/AuthContext";
import { signOutAction } from "./_lib/actions";

const roboto_font = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  style: "normal",
});

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto_font.className}>
        <AuthProvider>
          <Navbar signOutAction={signOutAction} />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
