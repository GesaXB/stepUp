import Hero from "@/components/home-page/hero";
import Story from "@/components/home-page/story";
import NewCollection from "@/components/home-page/new-collection";
import Collaboration from "@/components/home-page/collaboration";

export default function Home() {
  return (
    <div className="min-h-screen bg-white transition-colors duration-500">
      <main className="bg-white">
        <Hero />
        <Story />
        <NewCollection />
        <Collaboration />
      </main>
    </div>
  );
}
