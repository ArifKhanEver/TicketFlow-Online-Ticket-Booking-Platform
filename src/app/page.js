import AdvertisedTickets from "@/Components/home/AdvertisedTickets";
import Hero from "@/Components/home/Hero";
import LatestTickets from "@/Components/home/LatestTickets";


export default function Home() {
  return (
    <div className="bg-zinc-50 font-sans dark:bg-black">
      <Hero></Hero>
      <AdvertisedTickets></AdvertisedTickets>
      <LatestTickets/>
    </div>
  );
}
