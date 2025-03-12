import { PageContainerProps as Props } from "@/types/common";

const PageContainer = ({ children, className = "" }: Props) => {
  return <div className={`relative min-h-screen w-screen overflow-x-hidden ${className}`}>{children}</div>;
};

export default PageContainer;
