import "./admin.css";

export const metadata = { title: "Trijotech Admin" };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="admin-root">{children}</div>;
}
