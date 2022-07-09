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
  pokemon: { name, spriteUrl, id },
  onClick,
}) => {
  return (
    <div className="flex flex-col gap-2 p-4 bg-gray-900 rounded">
      <div className="w-32 h-32 bg-gray-700 rounded hover:brightness-90 delay-75 duration-100 cursor-pointer">
        {spriteUrl ? (
          <Image
            src={spriteUrl}
            alt={name}
            className="w-full"
            width={128}
            height={128}
            layout="fixed"
            priority
          />
        ) : (
          <div className="flex items-center w-full h-full p-3">
            <p className="text-center text-gray-400 text-sm">here will be the &apos;not found&apos; image</p>
          </div>
        )}
      </div>

      <p className="text-center capitalize text-gray-300">{!!name ? name : 'This one'}</p>

      <Button type="button" onClick={() => onClick(id)}>
        Rounder
      </Button>
    </div>
  );
};
