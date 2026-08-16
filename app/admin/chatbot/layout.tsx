const knowledgeTailwind = `
  [&_.kb-admin]:min-h-screen [&_.kb-admin]:bg-[#f3f6f8] [&_.kb-admin]:p-7 [&_.kb-admin]:font-[Poppins,sans-serif] [&_.kb-admin]:text-[#344054] max-[720px]:[&_.kb-admin]:p-3
  [&_.kb-admin>header]:mx-auto [&_.kb-admin>header]:flex [&_.kb-admin>header]:max-w-[1200px] [&_.kb-admin>header]:items-center [&_.kb-admin>header]:justify-between
  [&_.kb-admin_h1]:my-[6px] [&_.kb-admin_h1]:text-[#232555] [&_.kb-admin_button]:cursor-pointer [&_.kb-admin_button]:rounded-[9px] [&_.kb-admin_button]:border-0 [&_.kb-admin_button]:bg-[#087b71] [&_.kb-admin_button]:px-[15px] [&_.kb-admin_button]:py-[10px] [&_.kb-admin_button]:text-xs [&_.kb-admin_button]:text-white
  [&_.kb-stats]:mx-auto [&_.kb-stats]:my-5 [&_.kb-stats]:flex [&_.kb-stats]:max-w-[1200px] [&_.kb-stats]:gap-[10px] [&_.kb-stats_div]:min-w-[90px] [&_.kb-stats_div]:rounded-[10px] [&_.kb-stats_div]:border [&_.kb-stats_div]:border-[#e1e6eb] [&_.kb-stats_div]:bg-white [&_.kb-stats_div]:p-3
  [&_.kb-layout]:mx-auto [&_.kb-layout]:grid [&_.kb-layout]:max-w-[1200px] [&_.kb-layout]:grid-cols-[300px_1fr] [&_.kb-layout]:overflow-hidden [&_.kb-layout]:rounded-[15px] [&_.kb-layout]:border [&_.kb-layout]:border-[#e1e6eb] [&_.kb-layout]:bg-white max-[720px]:[&_.kb-layout]:block
  [&_.kb-layout>aside]:max-h-[760px] [&_.kb-layout>aside]:overflow-auto [&_.kb-layout>aside]:border-r [&_.kb-layout>aside]:border-[#e1e6eb] [&_.kb-layout>aside]:bg-[#f9fafb] [&_.kb-layout>aside]:p-[14px] max-[720px]:[&_.kb-layout>aside]:max-h-[260px] max-[720px]:[&_.kb-layout>aside]:border-b max-[720px]:[&_.kb-layout>aside]:border-r-0
  [&_.kb-layout_input]:w-full [&_.kb-layout_input]:rounded-lg [&_.kb-layout_input]:border [&_.kb-layout_input]:border-[#d2dae2] [&_.kb-layout_input]:p-[10px] [&_.kb-layout_textarea]:w-full [&_.kb-layout_textarea]:rounded-lg [&_.kb-layout_textarea]:border [&_.kb-layout_textarea]:border-[#d2dae2] [&_.kb-layout_textarea]:p-[10px]
  [&_.kb-form]:p-6 [&_.kb-row]:grid [&_.kb-row]:grid-cols-[1fr_130px] [&_.kb-row]:gap-3 max-[720px]:[&_.kb-row]:grid-cols-1
  [&_.kb-settings]:mx-auto [&_.kb-settings]:mt-6 [&_.kb-settings]:max-w-[1200px] [&_.kb-settings]:rounded-[15px] [&_.kb-settings]:border [&_.kb-settings]:border-[#e1e6eb] [&_.kb-settings]:bg-white [&_.kb-settings]:p-[22px]
  [&_.kb-settings-grid]:my-4 [&_.kb-settings-grid]:grid [&_.kb-settings-grid]:grid-cols-2 [&_.kb-settings-grid]:gap-3 max-[720px]:[&_.kb-settings-grid]:grid-cols-1`;

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={knowledgeTailwind}>{children}</div>;
}
