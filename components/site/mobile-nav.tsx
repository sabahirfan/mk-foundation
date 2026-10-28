"use client";

import { MenuIcon } from "lucide-react";
import { useState } from "react";
import { NavLinks } from "@/components/site/nav-links";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { site } from "@/content/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className="inline-flex size-11 items-center justify-center rounded-md text-ink hover:bg-rule-tint"
        aria-label="Open menu"
      >
        <MenuIcon className="size-6" aria-hidden />
      </SheetTrigger>
      <SheetContent side="right" className="w-[85vw] max-w-sm overscroll-contain bg-paper px-6 pt-16 [&>[data-slot=sheet-close]]:size-11">
        <SheetTitle className="text-xl font-semibold">{site.name}</SheetTitle>
        <SheetDescription className="sr-only">Site pages</SheetDescription>
        <nav aria-label="Main">
          <NavLinks className="flex-col gap-1 text-lg" onNavigate={() => setOpen(false)} />
        </nav>
      </SheetContent>
    </Sheet>
  );
}
