import "./App.css";
import Swal from "sweetalert2";
import { useState, useEffect, useRef } from "react";
import {
  Button,
  Table,
  TableContainer,
  Paper,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import RondeButton from "./RondeButton";

const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      background: "#fafafa",
    },
  },
  outwrapper: {
    margin: "1rem",
  },
  wrapper: {
    margin: "1rem auto",
    maxWidth: "40rem",
    "& > *": {
      marginBottom: "1rem",
    },
  },
  header: {
    "& > *": {
      marginRight: "1rem",
    },
  },
}));

function App() {
  const [joueurs, setJoueurs] = useState([]);
  const [scores, setScores] = useState([]);
  const [initialized, setInitialized] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    if (!initialized) return;

    localStorage.setItem(
      "tarot",
      JSON.stringify({
        joueurs,
        scores,
      })
    );
  }, [JSON.stringify(joueurs), JSON.stringify(scores)]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("tarot"));

    if (data) {
      setJoueurs(data.joueurs);
      setScores(data.scores);
    }
    setInitialized(true);
  }, []);

  const calculatedScores = scores.map((score) => {
    const seuil = {
      0: 56,
      1: 51,
      2: 41,
      3: 36,
    }[score.bouts];

    const reussie = score.points >= seuil ? 1 : -1;

    const base = 25;
    const multiplicateurContrat = {
      petite: 1,
      garde: 1,
      "garde-sans": 1,
      "garde-contre": 1,
    }[score.contrat];

    const ecart = Math.round(Math.abs(score.points - seuil) / 10) * 10;

    const total = (base + ecart) * multiplicateurContrat;

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

    return scoreRound;
  });

  return (
    <div className={classes.outwrapper}>
      <div className={classes.wrapper}>
        <h1>Score tarot</h1>
        <div className={classes.header}>
          <Button
            color="secondary"
            onClick={() => {
              Swal.fire({
                title: "Sûr de vouloir réinitialiser ?",
                showCancelButton: true,
                confirmButtonText: `Oui`,
                denyButtonText: `Non`,
              }).then((result) => {
                if (result.isConfirmed) {
                  setJoueurs([]);
                  setScores([]);
                }
              });
            }}
          >
            RESET
          </Button>
          {joueurs.length < 5 && (
            <Button
              color="primary"
              variant="contained"
              onClick={async () => {
                const { value: joueur } = await Swal.fire({
                  title: "Ajouter un joueur",
                  input: "text",
                  inputLabel: "Nouveau joueur",
                  inputPlaceholder: "John doe",
                });
                setJoueurs([...joueurs, joueur]);
              }}
            >
              Ajouter un joueur
            </Button>
          )}
        </div>
        <div>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  {joueurs.map((e) => (
                    <TableCell>{e}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {calculatedScores ? (
                  calculatedScores.map((calScore, index) => (
                    <TableRow key={index}>
                      <TableCell>{index}</TableCell>
                      {joueurs.map((e, indexJoueur) => (
                        <TableCell>
                          {calculatedScores
                            .slice(0, index + 1)
                            .reduce((acc, e) => {
                              acc = acc + e[indexJoueur];
                              return acc;
                            }, 0)}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>Pas encore de ronde</TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        {joueurs.length === 5 && (
          <RondeButton
            onComplete={(data) => {
              setScores([...scores, data]);
            }}
            joueurs={joueurs}
          >
            Ajouter une ronde
          </RondeButton>
        )}
      </div>
    </div>
  );
}

export default App;
