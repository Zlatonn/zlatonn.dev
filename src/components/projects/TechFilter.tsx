import { cn } from "@/lib/utils";

import { techFilterContent } from "@/contents/ProjectContent";
import { TechFilterProps as Props } from "@/types/projects";

const TechFilter = ({ techs, selectedTech, onSelect }: Props) => {
  const chips = [
    { key: "all", label: techFilterContent.allLabel, value: null },
    ...techs.map((tech) => ({ key: `tech-${tech}`, label: tech, value: tech })),
  ];

  return (
    <div role="group" aria-label={techFilterContent.ariaLabel} className="max-w-3xl px-4 flex flex-wrap justify-center gap-2">
      {chips.map(({ key, label, value }) => {
        const selected = value === selectedTech;
        return (
          <button
            key={key}
            type="button"
            aria-pressed={selected}
            onClick={() => onSelect(value)}
            className={cn(
              "px-3 py-1 md:px-4 md:py-1.5 text-xs md:text-sm font-medium rounded-md border transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
              selected ? "bg-primary border-primary text-secondary font-semibold" : "border-light/30 text-light hover:border-primary hover:text-primary"
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default TechFilter;
