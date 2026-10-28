import { ActionLink } from "@/components/site/action-link";
import { PageHeader } from "@/components/site/page-header";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <PageHeader note="see me" title="This page isn’t here">
      <p>The link may be old or mistyped. Try the home page or our work in Pakistan.</p>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2 text-base">
        <ActionLink href="/" variant="outline">
          Go to the home page
        </ActionLink>
        <ActionLink href="/causes/" variant="quiet">
          See our work
        </ActionLink>
      </div>
    </PageHeader>
  );
}
