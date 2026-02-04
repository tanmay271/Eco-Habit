import Link from 'next/link';
import { Leaf } from 'lucide-react';

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center px-4">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary font-heading">
                    <div className="rounded-full bg-primary/10 p-2">
                        <Leaf className="h-6 w-6" />
                    </div>
                    Eco-Habit
                </Link>
                <nav className="ml-auto flex gap-6">
                    <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
                        Challenges
                    </Link>
                    <Link href="#" className="text-sm font-medium transition-colors hover:text-primary">
                        Community
                    </Link>
                    <Link href="#" className="text-sm font-medium transition-colors hover:text-primary">
                        About
                    </Link>
                </nav>
            </div>
        </header>
    );
}
