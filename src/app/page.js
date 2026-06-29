import AdvertisedTickets from "@/Components/home/AdvertisedTickets";
import Hero from "@/Components/home/Hero";
import HowItWorks from "@/Components/home/HowItWorks";
import LatestTickets from "@/Components/home/LatestTickets";
import PopularDestinations from "@/Components/home/PopularDestinations";
import StatsCounter from "@/Components/home/StatsCounter";
import VendorCTA from "@/Components/home/VendorCTA";
import WhyChooseUs from "@/Components/home/WhyChooseUs";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="bg-zinc-50 font-sans dark:bg-black">
      <Hero></Hero>
      <AdvertisedTickets></AdvertisedTickets>
      <LatestTickets/>
      <HowItWorks/>
      <WhyChooseUs/>
      <PopularDestinations/>
      <StatsCounter/>
      <VendorCTA/>
    </div>
  );
}
