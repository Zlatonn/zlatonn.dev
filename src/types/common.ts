import { ReactNode } from "react";

export interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export interface onNavigateProps {
  onNavigate: (sectionId: string) => void;
}
