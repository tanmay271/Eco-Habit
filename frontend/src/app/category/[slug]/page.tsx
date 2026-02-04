import { Header } from "@/components/header";
import { fetchAPI } from "@/lib/api";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export const dynamic = 'force-dynamic';

async function getCategory(slug: string) {
    const res = await fetchAPI("/categories", {
        filters: { slug: { $eq: slug } },
        populate: { challenges: "*" },
    });
    // @ts-ignore
    return res.data?.[0];
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
    const category = await getCategory(params.slug);

    if (!category) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Category not found</h1>
                    <Link href="/" className="text-primary hover:underline">Go Home</Link>
                </div>
            </div>
        );
    }

    // Handle Strapi v4 vs v5 data structure difference (attributes vs flat)
    const catData = category.attributes || category;
    const challenges = catData.challenges?.data || catData.challenges || [];

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="container mx-auto px-4 py-8">
                <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Categories
                </Link>

                <div className="mb-12">
                    <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl mb-4 text-primary">
                        {catData.name}
                    </h1>
                    <div className="prose prose-green max-w-none text-muted-foreground">
                        {/* Simple rendering for now, rich text would need a serializer */}
                        {typeof catData.description === 'string' ? catData.description : "Get started with these challenges!"}
                    </div>
                </div>

                <section>
                    <h2 className="text-xl font-bold mb-6">Available Challenges</h2>

                    <div className="grid gap-4">
                        {challenges.length > 0 ? (
                            challenges.map((challenge: any) => {
                                const cData = challenge.attributes || challenge;
                                return (
                                    <div key={challenge.id} className="group relative overflow-hidden rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/20">
                                        <div className="flex items-start gap-4">
                                            <div className="rounded-full bg-secondary p-3 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                                <CheckCircle2 className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                                                    {cData.title}
                                                </h3>
                                                {/* Simple description rendering */}
                                                <p className="text-muted-foreground">
                                                    {typeof cData.description === 'string' ? cData.description : "Take action today!"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="p-8 text-center border-2 border-dashed rounded-xl ">
                                <p className="text-muted-foreground">No challenges added to this category yet.</p>
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}
