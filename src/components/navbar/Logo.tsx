import { LogoProps as Props } from "@/types/navbar";

const Logo = ({ title }: Props) => {
  return (
    <div className="px-3 py-1 bg-primary rounded-md cursor-pointer">
      <span className="text-light font-icon tracking-wider uppercase">{title}</span>
    </div>
  );
};

export default Logo;
