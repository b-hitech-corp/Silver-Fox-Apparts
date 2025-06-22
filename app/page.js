import { Suspense } from "react";
import About from "./_components/About";
import Blog from "./_components/Blog/Blog";

import Gallery from "./_components/Gallery";
import HeroSection from "./_components/HeroSection";
import Rooms from "./_components/Rooms";
import LoadingSpinner from "./_ui/LoadingSpinner";
import { redirect } from "next/navigation";
import ContactSection from "./_components/ContactSection";

export const metadata = {
  title: "Hotel Booking App",
  description: "Hotel Booking App built with NextJS",
  openGraph: {
    title: "Hotel Booking App",
    description: "Hotel Booking App built with NextJS",
    url: "https://www.silverfoxapparts.com", // Replace with your actual domain
    type: "website",
    images: [
      {
        url: "/img-9.jpg", // Ensure this path is correct and public
        width: 1200,
        height: 630,
        alt: "Hotel Booking Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hotel Booking App",
    description: "Hotel Booking App built with NextJS",
    images: ["/img-9.jpg"],
  },
};

export default async function Home() {
  async function bookingSearchAction(formatedRange) {
    "use server";
    redirect(`/rooms?range=${formatedRange}`);
  }
  return (
    <div id="__next">
      <HeroSection bookingSearchAction={bookingSearchAction} />
      <About />
      <Suspense
        fallback={
          <div className="global-loading">
            <LoadingSpinner />
          </div>
        }
      >
        <Rooms />
        <Gallery />
      </Suspense>
      <Blog />
      <ContactSection />
    </div>
  );
}
