import About from "@/components/home/About";
import FeaturedBikes from "@/components/home/FeaturedBikes";
import Hero from "@/components/home/Hero";
import Testimonials from "@/components/home/Testimonials";
import { testimonials } from "@/lib/data";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedBikes />
      <About />
      {testimonials.length > 0 && <Testimonials />}
    </>
  );
}
