import Dashboard from "@/components/Dashboard";
import Product from "@/models/product";

export default function Home() {
  return (
    <main className="min-h-screen max-w-7xl mx-auto flex flex-col items-center">
      {/* <Dashboard /> */}
      <Product />
    </main>
  )
};