import { ProviderLayer } from "@/app/middleware";

// src/app/(empty)/layout.tsx
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ProviderLayer>
      <div className="w-full max-w-[540px]">{children}</div>
    </ProviderLayer>
  );
}
