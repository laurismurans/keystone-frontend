import SearchProvider from "@/contexts/search/SearchProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SearchProvider>{children}</SearchProvider>;
}
