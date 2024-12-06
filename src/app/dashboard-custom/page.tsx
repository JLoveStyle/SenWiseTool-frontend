import { LayoutDashboardCustom } from "@/components/molecules/dashboard-custom/layout-dashboard-custom";

export default function Home() {
  return (
    <LayoutDashboardCustom>
      <div className="text-gray-800 dark:text-white">
        <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
        <p>This is a modern, dynamic, and responsive dashboard.</p>
      </div>
    </LayoutDashboardCustom>
  );
}
