import { Loading } from "components/loading";
import { OptionToVote } from "components/optionToVote";
import type { NextPage } from "next";
import { memo, useState } from "react";
import { getOptionsForVote } from "utils/getRandom";
import { trpc } from "utils/trpc";

const Home: NextPage = () => {
  const [ids, updateIds] = useState(() => getOptionsForVote());
  const [first, second] = ids;

  const firstPokemon = trpc.useQuery(["get-pokemon-by-id", { id: first }]);
  const secondPokemon = trpc.useQuery(["get-pokemon-by-id", { id: second }]);

  const voteMutation = trpc.useMutation(["cast-vote"]);

  const handleVoteForRoundest = async (selected: number) => {
    if (selected === first) {
      voteMutation.mutate({
        votedAgainstId: second,
        votedForId: first,
      });
    }

    if (selected === second) {
      voteMutation.mutate({
        votedAgainstId: first,
        votedForId: second,
      });
    }

    updateIds(getOptionsForVote());
  };

  if (firstPokemon.isLoading || secondPokemon.isLoading) {
    return <Loading />;
  }

  return (
    <main>
      <div className="h-screen w-screen flex flex-col justify-center items-center">
        <div className="text-2xl text-center mb-6">
          Which subject is more relevant?
        </div>

        <div className="border rounded p-5 flex justify-between items-center max-w-2xl">
          {firstPokemon.data && (
            <OptionToVote
              pokemon={{
                ...firstPokemon.data,
                id: first,
              }}
              onClick={handleVoteForRoundest}
            />
          )}

          <span className="text-2xl p-8">Vs</span>

          {secondPokemon.data && (
            <OptionToVote
              pokemon={{
                ...secondPokemon.data,
                id: second,
              }}
              onClick={handleVoteForRoundest}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default memo(Home);
