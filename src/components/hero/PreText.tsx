import { PreTextProps as Props } from "@/types/hero";

const PreText = ({ text, className }: Props) => {
  return <p className={`md:text-xl ${className}`}>{text}</p>;
};

export default PreText;
