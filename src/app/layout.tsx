export const metadata = { title: "Todo demo" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body style={{ fontFamily: "sans-serif", maxWidth: 480, margin: "2rem auto" }}>{children}</body>
    </html>
  );
}
