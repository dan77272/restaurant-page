import AboutUsSection from "@/components/AboutUsSection";
import ContactUs from "@/components/ContactUs";
import FirstBanner from "@/components/FirstBanner";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import MenuSection from "@/components/MenuSection";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      <Navbar/>
      <Hero/>
      <div className="mt-[100vh] mb-[150px]">
        <AboutUsSection />
      </div>
      <FirstBanner/>
      <MenuSection/>
      <FirstBanner/>
      <ContactUs/>
      <Footer/>
    </main>
  );
}
