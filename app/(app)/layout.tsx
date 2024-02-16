import { Icons } from "@/components/icons";
import { MainNav } from "@/components/layouts/main-nav";
import { SiteFooter } from "@/components/layouts/site-footer";

interface IProps {
  children?: React.ReactNode;
}

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

const LINKS: NavItem[] = [
  {
    href: "/",
    title: "RADIATION PHYSICS LABORATORY, FUNAAB",
  },
];

export default async function Layout({ children }: IProps) {
  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav items={LINKS} />
        </div>
      </header>
      <div className="container flex-1">{children}</div>
      <SiteFooter className="border-t" />
    </div>
  );
}
