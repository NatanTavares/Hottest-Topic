import { Pokemon } from "types/types";
import { Button } from "./button";

export type OptionToVoteProps = {
  pokemon: Pokemon & {
    id: number;
  };
  onClick: (id: number) => void;
};

export const OptionToVote: React.FC<OptionToVoteProps> = ({
  pokemon: { name, sprites, id },
  onClick,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="w-32 h-32 bg-gray-700 rounded hover:brightness-90 delay-75 duration-100">
        {sprites?.front_default && (
          <img
            src={sprites.front_default}
            alt="first option"
            className="w-full"
          />
        )}
      </div>

      {name && <p className="text-center capitalize">{name}</p>}

      <Button type="button" onClick={() => onClick(id)}>
        Rounder
      </Button>
    </div>
  );
};
