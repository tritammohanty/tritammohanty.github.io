"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionTracker } from "@/components/section-tracker";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
const links = [
  { name: "Projects", href: "/#projects" },
  { name: "Experience", href: "/#experience" },
  { name: "About", href: "/#about" },
  { name: "Writing", href: "/writing/" },
];
type Theme = "light" | "dark" | "system";
export function Header({ trackSections = false }: { trackSections?: boolean }) {
  const [theme, setTheme] = useState<Theme>("system");
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const sync = () => {
      let saved = "system";
      try {
        saved = localStorage.getItem("tritam-theme") || "system";
      } catch {}
      const next: Theme = saved === "dark" || saved === "light" ? saved : "system";
      setTheme(next);
      document.documentElement.classList.toggle(
        "dark",
        next === "dark" || (next === "system" && media.matches),
      );
    };
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);
  function changeTheme(value: string) {
    const next = value as Theme;
    setTheme(next);
    try {
      localStorage.setItem("tritam-theme", next);
    } catch {}
    document.documentElement.classList.toggle(
      "dark",
      next === "dark" || (next === "system" && matchMedia("(prefers-color-scheme: dark)").matches),
    );
  }
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <header className="site-header">
        <div className={`container header-layout ${trackSections ? "header-with-tracker" : ""}`}>
          <Link className="wordmark" href="/#hero" aria-label="Tritam, home">
            tritam<span className="text-primary">.</span>
          </Link>
          {trackSections ? (
            <SectionTracker />
          ) : (
            <NavigationMenu className="hidden md:flex" aria-label="Main navigation">
              <NavigationMenuList className="gap-5">
                {links.map((link) => (
                  <NavigationMenuItem key={link.name}>
                    <NavigationMenuLink href={link.href} className="nav-link">
                      {link.name}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          )}
          <div className="header-actions flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Change color theme">
                  <Sun className="dark:hidden" />
                  <Moon className="hidden dark:block" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                <DropdownMenuRadioGroup value={theme} onValueChange={changeTheme}>
                  <DropdownMenuRadioItem value="light">
                    <Sun />
                    Light
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="dark">
                    <Moon />
                    Dark
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="system">
                    <Monitor />
                    System
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              asChild
              className={trackSections ? "hidden xl:inline-flex" : "hidden sm:inline-flex"}
              variant="outline"
            >
              <Link href="/#contact">
                Let&apos;s connect <ArrowUpRight />
              </Link>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  className="md:hidden"
                  aria-label="Open navigation"
                >
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Explore</SheetTitle>
                  <SheetDescription>
                    Projects, experience, and the person behind the work.
                  </SheetDescription>
                </SheetHeader>
                <nav aria-label="Mobile navigation" className="flex flex-col gap-3 p-6">
                  {[...links, { name: "Contact", href: "/#contact" }].map((link) => (
                    <SheetClose asChild key={link.name}>
                      <a
                        href={link.href}
                        className="rounded-md p-3 text-2xl font-medium hover:bg-muted"
                      >
                        {link.name}
                      </a>
                    </SheetClose>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}
