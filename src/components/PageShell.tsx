import type { CSSProperties, ReactNode } from "react";

export const theme = {
  maxWidth: 720,
  brand: "#f12345",
  textMuted: "#444",
  textFaint: "#666",
} as const;

const mainStyle: CSSProperties = {
  maxWidth: theme.maxWidth,
  margin: "0 auto",
  padding: "48px 20px",
};

const titleStyle: CSSProperties = {
  margin: 0,
  fontSize: 28,
  letterSpacing: "-0.02em",
};

export function PageShell({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <main style={mainStyle}>
      <h1 style={titleStyle}>{title}</h1>
      {children}
    </main>
  );
}
