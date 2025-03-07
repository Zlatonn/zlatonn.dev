import { HeroTitleProps as Props } from "@/types/hero";

const HeroTitle = ({ titles }: Props) => {
  return (
    <div className="text-accent font-display font-bold text-5xl md:text-7xl xl:text-8xl">
      {titles.map((title, i) => (
        <p key={`titles-${i}`}>
          {title}
          {i != titles.length - 1 ? <br /> : ""}
        </p>
      ))}
    </div>
  );
};

export default HeroTitle;
