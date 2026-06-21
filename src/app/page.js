import AdvertisedTickets from "@/Components/home/AdvertisedTickets";
import Hero from "@/Components/home/Hero";
import HowItWorks from "@/Components/home/HowItWorks";
import LatestTickets from "@/Components/home/LatestTickets";
import WhyChooseUs from "@/Components/home/WhyChooseUs";


export default function Home() {
  return (
    <div className="bg-zinc-50 font-sans dark:bg-black">
      <Hero></Hero>
      <AdvertisedTickets></AdvertisedTickets>
      <LatestTickets/>
      <HowItWorks/>
      <WhyChooseUs/>
    </div>
  );
}
