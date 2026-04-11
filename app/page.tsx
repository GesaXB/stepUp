import Navbar from "@/components/layout/navbar";
import Hero from "@/components/home-page/hero";
import Story from "@/components/home-page/story";
import NewCollection from "@/components/home-page/new-collection";
import Collaboration from "@/components/home-page/collaboration";
import Footer from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white transition-colors duration-500">
      <Navbar />
      <main className="bg-white">
        <Hero />
        <Story />
        <NewCollection />
        <Collaboration />
      </main>
      <Footer />
    </div>
  );
}
