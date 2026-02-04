import { Header } from "@/components/header";
import { fetchAPI } from "@/lib/api";
import { CategoryCard } from "@/components/category-card";

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic';

async function getCategories() {
  try {
    const res = await fetchAPI("/categories", { populate: "*" });
    // @ts-ignore - Strapi response typing
    return res.data || [];
  } catch (error) {
    return [];
  }
}

export default async function Home() {
  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Header />

      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="mx-auto max-w-3xl text-center mb-20">
          <div className="inline-block rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent-foreground mb-6">
            🌱 Small steps, big impact
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl mb-6 bg-gradient-to-r from-primary to-teal-600 bg-clip-text text-transparent">
            Build Better Habits for a Greener Planet
          </h1>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join thousands of others in daily eco-challenges designed to reduce your carbon footprint and create a sustainable lifestyle.
          </p>
          <div className="flex justify-center gap-4">
            <button className="rounded-full bg-primary px-8 py-3 font-medium text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:scale-105 active:scale-95">
              Start a Challenge
            </button>
            <button className="rounded-full bg-white border border-input px-8 py-3 font-medium text-foreground shadow-sm transition-all hover:bg-secondary hover:text-primary">
              Learn More
            </button>
          </div>
        </section>

        {/* Categories Grid */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight">Explore Categories</h2>
          </div>

          {categories.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category: any) => (
                <CategoryCard
                  key={category.id}
                  name={category.attributes?.name || category.name}
                  slug={category.attributes?.slug || category.slug}
                  description={category.attributes?.description || category.description}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed p-12 text-center text-muted-foreground bg-card/50">
              <p className="text-lg font-medium">No categories found yet.</p>
              <p className="text-sm mt-2">Head to your Strapi admin panel to create some!</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
