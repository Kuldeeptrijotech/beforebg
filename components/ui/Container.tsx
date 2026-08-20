import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-7xl 2xl:max-w-[1536px] 3xl:max-w-[1780px] px-4 sm:px-6 lg:px-8 2xl:px-12 ${className}`}>
      {children}
    </div>
  );
}