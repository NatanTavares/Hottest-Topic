import Image from "next/image";
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
          <Image
            src={sprites.front_default}
            alt={name}
            className="w-full"
            width={256}
            height={256}
            layout="fixed"
            priority
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
