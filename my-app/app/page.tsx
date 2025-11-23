import { getHomePage } from "@/lib/strapi";
import { HeroSection } from "@/components/ui/hero-section";

export const metadata = {
  title: "Keko Yoma",
  description: "WConfigurando SEO en Next.js con Strapi",
};

export default async function Home() {
  const strapiData = await getHomePage()
  console.log(strapiData)

  const { title, description } = strapiData
  const [ heroSection ] = strapiData?.sections || []

  return (
    <main className="container mx-auto py-6">
      <HeroSection data={heroSection} />
    </main>
  );
}
