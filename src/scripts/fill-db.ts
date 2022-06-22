import { PokemonClient } from "pokenode-ts";
import { prisma } from "../services/prisma";

const doBackFill = async () => {
  const api = new PokemonClient();
  const { results } = await api.listPokemons(0, 493);

  if (!results.length) return;
  const formattedPokemons = results.map((pokemon, index) => {
    const id: number = index + 1;

    return {
      id,
      name: pokemon.name,
      spriteUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    };
  });

  const creation = await prisma.pokemon.createMany({ data: formattedPokemons });
};

doBackFill();
