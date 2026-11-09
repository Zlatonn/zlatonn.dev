import { allTechLabel } from "@/contents/ProjectContent";

import { TechFilterProps as Props } from "@/types/projects";

const TechFilter = ({ techs, selectedTech, onSelect }: Props) => {
  const options: { label: string; value: string | null }[] = [
    { label: allTechLabel, value: null },
    ...techs.map((tech) => ({ label: tech, value: tech })),
  ];

  return (
    <div className="mx-10 flex flex-wrap justify-center gap-2">
      {options.map(({ label, value }) => {
        const selected = value === selectedTech;
        return (
          <button
            key={label}
            type="button"
            aria-pressed={selected}
            onClick={() => onSelect(value)}
            className={`px-2 py-1 text-xs rounded-md border duration-300 ${
              selected ? "bg-accent border-accent text-secondary" : "border-light/50 text-light hover:border-light"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default TechFilter;
