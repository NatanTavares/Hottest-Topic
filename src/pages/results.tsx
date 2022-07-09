import { ResultList } from "components/resultItem";
import type { GetServerSideProps, NextPage } from "next";
import { memo } from "react";
import { prisma } from "services/prisma";

type ResultsPageProps = {
  pokemons: Array<ResultPokemonType>;
};

const ResultsPage: NextPage<ResultsPageProps> = ({ pokemons }) => {
  if (!pokemons) {
    return <p>not found any result!</p>;
  }

  return (
    <main>
      <div className="h-screen w-screen flex flex-col items-center p-5">
        <h1 className="mb-4 text-xl">Results page</h1>
        <ResultList pokemons={pokemons} />
      </div>
    </main>
  );
};

export type ResultPokemonType = Awaited<
  ReturnType<typeof getPokemonsInOrder>
>[number];

const getPokemonsInOrder = async () =>
  await prisma.pokemon.findMany({
    orderBy: [
      {
        votesFor: { _count: "desc" },
      },
    ],
    where: {
      votesFor: { some: { id: undefined } },
    },
    select: {
      id: true,
      name: true,
      spriteUrl: true,
      _count: {
        select: {
          votesFor: true,
          votesAgainst: true,
        },
      },
    },
  });

export const getStaticProps: GetServerSideProps = async () => {
  const pokemonsOrdered = await getPokemonsInOrder();

  return {
    revalidate: 60 * 5, // 5 minutes
    props: {
      pokemons: pokemonsOrdered,
    },
  };
};

export default memo(ResultsPage);
