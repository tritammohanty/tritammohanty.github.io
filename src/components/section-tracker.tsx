"use client";

import { useEffect, useState } from "react";
import { m, useScroll } from "motion/react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

const sections = [
  { id: "hero", label: "Intro", compact: "Intro" },
  { id: "projects", label: "Projects", compact: "Work" },
  { id: "experience", label: "Experience", compact: "Career" },
  { id: "about", label: "About", compact: "About" },
  { id: "writing", label: "Writing", compact: "Read" },
  { id: "contact", label: "Contact", compact: "Contact" },
];

export function SectionTracker() {
  const [active, setActive] = useState("hero");
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const elements = sections.flatMap(({ id }) => {
      const element = document.getElementById(id);
      return element ? [element] : [];
    });
    const footer = document.querySelector("footer");
    function update() {
      const readingLine = Math.min(window.innerHeight * 0.35, 220);
      if (footer && footer.getBoundingClientRect().top < window.innerHeight) {
        setActive("contact");
        return;
      }
      const current = elements.filter(
        (element) => element.getBoundingClientRect().top <= readingLine,
      );
      setActive(current.at(-1)?.id ?? "hero");
    }
    let observer: IntersectionObserver;
    function observe() {
      observer?.disconnect();
      const line = Math.min(window.innerHeight * 0.35, 220);
      observer = new IntersectionObserver(update, {
        rootMargin: `-${line}px 0px -${window.innerHeight - line - 1}px 0px`,
      });
      elements.forEach((element) => observer.observe(element));
      update();
    }
    const footerObserver = new IntersectionObserver(update);
    if (footer) footerObserver.observe(footer);
    observe();
    window.addEventListener("resize", observe);
    return () => {
      observer.disconnect();
      footerObserver.disconnect();
      window.removeEventListener("resize", observe);
    };
  }, []);

  return (
    <>
      <NavigationMenu className="section-tracker" aria-label="Page sections">
        <NavigationMenuList className="section-tracker-list">
          {sections.map((section) => (
            <NavigationMenuItem key={section.id}>
              <NavigationMenuLink
                href={`#${section.id}`}
                className="section-tracker-link"
                aria-current={active === section.id ? "location" : undefined}
                onClick={() => setActive(section.id)}
              >
                <span className="hidden lg:inline">{section.label}</span>
                <span className="lg:hidden">{section.compact}</span>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <div className="reading-progress" aria-hidden="true">
        <m.div className="reading-progress-fill" style={{ scaleX: scrollYProgress }} />
      </div>
    </>
  );
}
