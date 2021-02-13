import calculateScore from "./calculateScore";

test("1", () => {
  const score = {
    appele: 1,
    bouts: 2,
    contrat: "garde",
    petit_au_bout: "defense",
    poignees: [{ type: "simple", joueur: 0 }],
    points: 50.5,
    pour: "attaque",
    preneur: 0,
  };
  expect(calculateScore(score)).toEqual({
    0: 158,
    1: 79,
    2: -79,
    3: -79,
    4: -79,
  });
});
test("2", () => {
  const score = {
    appele: 4,
    bouts: 0,
    contrat: "petite",
    petit_au_bout: "defense",
    poignees: [
      { type: "simple", joueur: 2 },
      { type: "simple", joueur: 4 },
    ],
    points: 34.5,
    pour: "attaque",
    preneur: 2,
  };
  expect(calculateScore(score)).toEqual({
    0: 96.5,
    1: 96.5,
    2: -193,
    3: 96.5,
    4: -96.5,
  });
});
