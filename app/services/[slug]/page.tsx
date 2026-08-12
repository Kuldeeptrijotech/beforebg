import PlaceholderPage from "@/components/common/PlaceholderPage";
import { redirect } from "next/navigation";

const existingServiceRoutes: Record<string, string> = {
  "sap-consulting": "/services/sap-implementation",
  "sap-support-ams": "/services/sap-support",
  "sap-btp-full-stack-applications": "/services/sap-btp-full-stack",
  "sap-data-integration-migration": "/services/sap-data-integration",
  "sap-ai-data-insight-services": "/services/sap-ai-ml",
};

export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (existingServiceRoutes[slug]) redirect(existingServiceRoutes[slug]);
  const service = {
    title: slug.split("-").map((word) => word[0]?.toUpperCase() + word.slice(1)).join(" "),
    description: "A practical enterprise technology service delivered by the Trijotech team.",
  };
  return <PlaceholderPage eyebrow="Our Services" title={service.title} description={service.description} />;
}
