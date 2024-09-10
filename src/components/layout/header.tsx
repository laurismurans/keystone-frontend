import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import HomeIcon from "@/assets/icons/home";
import UserIcon from "@/assets/icons/user";

export function Header() {
  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6 shadow-lg">
      <Link href="/" className="mr-6 flex items-center" prefetch={false}>
        <HomeIcon className="h-6 w-6" />
        <span className="sr-only">Keystone frontend test</span>
      </Link>
      <nav className="hidden lg:flex gap-4 md:gap-6">
        <span className="text-sm font-medium">
          Home assignment for keystone
        </span>
      </nav>
      <div className="ml-auto flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <UserIcon className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </div>
    </header>
  );
}
