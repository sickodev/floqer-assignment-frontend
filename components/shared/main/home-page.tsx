"use client"
import BaseTable from "@/components/shared/base-table";
import Hero from "@/components/shared/hero";
import { useRef } from "react";

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLDivElement>(null)
    return (
    <div className="h-full">
      <Hero heroRef={heroRef} tableRef={tableRef}/>
      <BaseTable tableRef={tableRef}/>
    </div>
  );
}
