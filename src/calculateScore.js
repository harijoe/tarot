const calculateScore = (score) => {
  const seuil = {
    0: 56,
    1: 51,
    2: 41,
    3: 36,
  }[score.bouts];

  const reussie =
    score.pour === "attaque"
      ? score.points >= seuil
        ? 1
        : -1
      : score.points <= seuil - 1
      ? 1
      : -1;

  // Demi-point
  const points = score.points;

  const base = 25;
  const multiplicateurContrat = {
    petite: 1,
    garde: 2,
    "garde-sans": 4,
    "garde-contre": 8,
  }[score.contrat];

  const ecart = Math.abs(points - seuil);

  let total = (base + ecart) * multiplicateurContrat;

  if (score.petit_au_bout) {
    if (score.petit_au_bout === "attaque") {
      total = total + 10 * reussie;
    }
    if (score.petit_au_bout === "defense") {
      total = total - 10 * reussie;
    }
  }

  const scoreRound = {
    0: total * reussie * -1,
    1: total * reussie * -1,
    2: total * reussie * -1,
    3: total * reussie * -1,
    4: total * reussie * -1,
  };

  scoreRound[score.preneur] = 0;
  scoreRound[score.appele] = 0;

  scoreRound[score.preneur] += total * 2 * reussie;
  scoreRound[score.appele] += total * reussie;

  // Poignees
  score.poignees.forEach(({ type, joueur }) => {
    const valeur = {
      simple: 20,
      double: 30,
      triple: 40,
    }[type];

    const pourLattaque =
      ([score.preneur, score.appele].includes(joueur) && reussie) ||
      (![score.preneur, score.appele].includes(joueur) && !reussie)
        ? 1
        : -1;

    scoreRound[0] = scoreRound[0] - valeur * pourLattaque * reussie;
    scoreRound[1] = scoreRound[1] - valeur * pourLattaque * reussie;
    scoreRound[2] = scoreRound[2] - valeur * pourLattaque * reussie;
    scoreRound[3] = scoreRound[3] - valeur * pourLattaque * reussie;
    scoreRound[4] = scoreRound[4] - valeur * pourLattaque * reussie;

    scoreRound[score.preneur] =
      scoreRound[score.preneur] + valeur * 3 * pourLattaque * reussie;
    scoreRound[score.appele] =
      scoreRound[score.appele] + valeur * 2 * pourLattaque * reussie;
  });

  return scoreRound;
};

export default calculateScore;
