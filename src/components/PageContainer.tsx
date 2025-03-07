import { PageContainerProps as Props } from "@/types/common";

const PageContainer = ({ children, className = "" }: Props) => {
  return <div className={`relative min-h-screen w-screen ${className}`}>{children}</div>;
};

export default PageContainer;
