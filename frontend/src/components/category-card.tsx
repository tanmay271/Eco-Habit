import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
    name: string;
    description: string;
    slug: string;
    icon?: React.ReactNode;
}

export function CategoryCard({ name, description, slug }: CategoryCardProps) {
    // Safe extraction of text from blocks or string
    const descriptionText = typeof description === 'string'
        ? description
        : 'Join this eco-challenge!';

    return (
        <Link href={`/category/${slug}`} className="group block h-full">
            <div className="relative h-full overflow-hidden rounded-2xl border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/5 transition-all group-hover:bg-primary/10" />

                <h3 className="mb-2 text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
                    {name}
                </h3>

                <p className="mb-6 text-muted-foreground line-clamp-2">
                    {descriptionText}
                </p>

                <div className="mt-auto flex items-center text-sm font-medium text-primary">
                    View Challenges
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
            </div>
        </Link>
    );
}
