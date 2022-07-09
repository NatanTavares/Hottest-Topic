import { PokemonClient } from "pokenode-ts";
import { prisma } from "../services/prisma";

const doBackFill = async () => {
  const api = new PokemonClient();
  const { results } = await api.listPokemons(0, 493);

  if (!results.length) return;
  const formattedPokemons = results.map(({ name }, index) => {
    const id = index + 1;
    const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

    return {
      id,
      name,
      spriteUrl,
    };
  });

  await prisma.pokemon.createMany({ data: formattedPokemons });
};

doBackFill();
