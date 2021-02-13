import Swal from "sweetalert2";
import { useState, useEffect, useMemo } from "react";
import {
  Button,
  Table,
  TableContainer,
  Paper,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import RondeButton from "./RondeButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
import withReactContent from "sweetalert2-react-content";
import BooleanIcon from "./BooleanIcon";
import ScoreTable from "./ScoreTable";
import calculateScore from "./calculateScore";

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

  const calculatedScores = useMemo(() => scores.map(calculateScore), [
    JSON.stringify(scores),
  ]);

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
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {calculatedScores ? (
                  scores.map((score, index) => (
                    <TableRow key={index}>
                      <TableCell>{index}</TableCell>
                      {joueurs.map((e, indexJoueur) => (
                        <TableCell align="center">
                          {calculatedScores
                            .slice(0, index + 1)
                            .reduce((acc, e) => {
                              acc = acc + e[indexJoueur];
                              return acc;
                            }, 0)}
                        </TableCell>
                      ))}
                      <TableCell>
                        <IconButton
                          color="primary"
                          onClick={() => {
                            withReactContent(Swal).fire({
                              html: (
                                <div>
                                  <p>Preneur : {joueurs[score.preneur]}</p>
                                  <p>Appelé : {joueurs[score.appele]}</p>
                                  <p>
                                    Contrat : {score.contrat}{" "}
                                    <BooleanIcon
                                      style={{ marginBottom: "-0.3rem" }}
                                      checked={score.reussie}
                                    />
                                  </p>
                                  <ScoreTable
                                    roundScores={calculatedScores[index]}
                                    joueurs={joueurs}
                                  />
                                </div>
                              ),
                            });
                          }}
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </TableCell>
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
