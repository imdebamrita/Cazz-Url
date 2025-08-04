"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

function MySeparator({
  className,
}: React.ComponentProps<any> & {
}) {
  return (
    <div className={cn("flex flex-col items-center justify-center px-2", className)}>
      <div style={{ height: '100px', width: '2px', borderRadius: '2px', background: 'var(--border)' }} />
    </div>
  );
}

export { MySeparator }
