"use client";

import { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export function SearchBar() {
  const router = useRouter();
  const params = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const defaultValue = params.get("q") ?? "";

  function onSubmit(formData: FormData) {
    const next = new URLSearchParams(params.toString());
    const query = formData.get("search")?.toString() ?? "";
    if (query) {
      next.set("q", query);
    } else {
      next.delete("q");
    }
    startTransition(() => {
      router.replace(`/?${next.toString()}`);
    });
  }

  return (
    <form action={onSubmit} className="group relative flex items-center rounded-full border border-white/15 bg-white/5 px-5 py-3 text-white">
      <MagnifyingGlassIcon className="h-5 w-5 text-emerald-200/80" />
      <input
        name="search"
        defaultValue={defaultValue}
        placeholder="Hatteras, Delta, Superior..."
        className="ml-3 flex-1 bg-transparent text-base text-white placeholder:text-slate-400 focus:outline-none"
      />
      <button
        type="submit"
        className="rounded-full bg-emerald-400/90 px-4 py-2 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-300"
      >
        {isPending ? "Searching..." : "Dial it in"}
      </button>
    </form>
  );
}
