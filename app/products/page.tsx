import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-40 pb-24 px-12 md:px-24 max-w-[1280px] mx-auto min-h-[60vh]">
        <h1 className="text-[60px] md:text-[100px] font-black italic uppercase tracking-tighter">Products</h1>
        <p className="text-zinc-500 font-bold text-lg mt-8">Our collection is coming soon.</p>
      </main>
      <Footer />
    </div>
  );
}
