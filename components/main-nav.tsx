import Link from 'next/link';

export default function MainNav() {
    return (
        <nav className="flex items-center space-x-4 lg:space-x-6">
            <Link className="text-sm font-medium text-muted-foreground hover:text-foreground"
                href="/">
                Main Page
            </Link>
            <Link href="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Dashboard
            </Link>
        </nav>
    )
}