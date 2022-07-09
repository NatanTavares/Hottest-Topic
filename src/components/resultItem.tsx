import Image from "next/image";
import type { ResultPokemonType } from "pages/results";
import { NotFoundImage } from "./notFoundImage";

type ResultListProps = {
  pokemons: Array<ResultPokemonType>;
};

type ResultItemProps = {
  pokemon: ResultPokemonType;
  position: number;
};

const ResultItem: React.FC<ResultItemProps> = ({ pokemon, position }) => {
  const { name, spriteUrl, _count } = pokemon;

  return (
    <li className="list-none w-full flex items-center px-4 py-1 bg-gray-900 rounded">
      <div className="flex items-center gap-4 mr-8">
        <span className="text-gray-500 text-sm italic">{position}</span>

        {spriteUrl ? (
          <Image
            src={spriteUrl}
            alt={name}
            className="w-full"
            width={52}
            height={52}
            layout="fixed"
            priority
          />
        ) : (
          <NotFoundImage />
        )}
      </div>

      <div className="w-full flex justify-between gap-2">
        <p className="text-gray-200 capitalize">{name}</p>

        <div className="flex gap-12">
          <strong className="text-green-400">{_count.votesFor}</strong>
          <strong className="text-red-400">{_count.votesAgainst}</strong>
        </div>
      </div>
    </li>
  );
};

export const ResultList: React.FC<ResultListProps> = ({ pokemons }) => {
  return (
    <ul className="list-none max-w-3xl w-full flex flex-col gap-3 p-4 border rounded overflow-scroll">
      <div className="flex justify-between w-full py-1 bg-gray-900 rounded text-gray-500 text-sm capitalize font-medium italic">
        <div className="flex px-4">
          <p>position</p>
          <p className="ml-14">name</p>
        </div>
        <p className="mr-5">tradeoffs</p>
      </div>

      {pokemons.map((pokemon, index) => (
        <ResultItem key={pokemon.id} position={index + 1} pokemon={pokemon} />
      ))}
    </ul>
  );
};
