import { UserNav } from "./user-nav";

export function Header() {
    return (
        <header className="fixed w-full top-0 z-0 flex h-16 items-center gap-4 border-b bg-background px-6">
            <div className="flex-1" />
            <UserNav />
        </header>
    )
}