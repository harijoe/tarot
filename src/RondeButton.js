import React, { useState } from "react";
import Swal from "sweetalert2";

import {
  Button,
  Dialog,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
  Radio,
  FormControlLabel,
  FormLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Field, Form } from "formik";
import {
  Select,
  TextField,
  RadioGroup,
  CheckboxWithLabel,
} from "formik-material-ui";
import * as yup from "yup";
import withReactContent from "sweetalert2-react-content";
import PoigneeForm from "./PoigneeForm";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexFlow: "column",
    margin: "0.5rem",

    "& > *": {
      marginBottom: "0.5rem",
    },

    "& button": {
      marginTop: "1rem",
    },
  },
  pour: {
    display: "flex",
  },
}));

const RondeButton = ({ children, joueurs, onComplete }) => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        {children}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Formik
            initialValues={{
              preneur: null,
              appele: null,
              contrat: null,
              points: "",
              bouts: "",
              pour: "attaque",
              poignees: [],
              //   miseres_tete: [],
              //   miseres_atout: [],
              petit_au_bout: "",
            }}
            onSubmit={(data) => {
              setOpen(false);
              onComplete(data);
            }}
            validationSchema={yup.object().shape({
              preneur: yup.number().required(),
              appele: yup.number().required(),
              contrat: yup.string().required(),
              points: yup
                .number()
                .max(91, "Le nombre de points doit être entre 0 et 91")
                .min(0, "Le nombre de points doit être entre 0 et 91")
                .required(),
              bouts: yup
                .number()
                .max(3, "Le nombre de bouts doit être entre 0 et 3")
                .min(0, "Le nombre de bouts doit être entre 0 et 3")
                .required(),
              poignees: yup.array(),
              pour: yup.string().required(),
              petit_au_bout: yup.string(),
            })}
          >
            {({ isSubmitting, errors, values, setFieldValue }) => (
              <Form className={classes.form}>
                <FormControl>
                  <InputLabel id="preneur">Preneur</InputLabel>
                  <Field component={Select} name="preneur" labelId="preneur">
                    {joueurs.map((joueur, index) => (
                      <MenuItem value={index}>{joueur}</MenuItem>
                    ))}
                  </Field>
                </FormControl>
                <FormControl>
                  <InputLabel id="appele">Appelé</InputLabel>
                  <Field component={Select} name="appele" labelId="appele">
                    {joueurs.map((joueur, index) => (
                      <MenuItem value={index}>{joueur}</MenuItem>
                    ))}
                  </Field>
                </FormControl>
                <FormControl>
                  <InputLabel id="contrat">Contrat</InputLabel>
                  <Field component={Select} name="contrat" labelId="contrat">
                    <MenuItem value="petite">Petite</MenuItem>
                    <MenuItem value="garde">Garde</MenuItem>
                    <MenuItem value="garde-sans">Garde Sans</MenuItem>
                    <MenuItem value="garde-contre">Garde Contre</MenuItem>
                  </Field>
                </FormControl>
                <Field
                  component={TextField}
                  type="number"
                  name="bouts"
                  label="Nombre de bouts"
                ></Field>
                <Field
                  component={TextField}
                  type="number"
                  name="points"
                  label="Nombre de points"
                ></Field>
                <div style={{ marginTop: "1rem" }}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Pour :</FormLabel>
                    <Field component={RadioGroup} name="pour">
                      <FormControlLabel
                        value="attaque"
                        control={<Radio disabled={isSubmitting} />}
                        label="l'Attaque"
                        disabled={isSubmitting}
                      />
                      <FormControlLabel
                        value="defense"
                        control={<Radio disabled={isSubmitting} />}
                        label="la Défense"
                        disabled={isSubmitting}
                      />
                    </Field>
                  </FormControl>
                </div>
                <div style={{ border: "1px solid black", padding: "1rem" }}>
                  <p style={{ marginTop: 0 }}>Poignées</p>
                  {values.poignees.map(({ joueur, type }) => (
                    <li>
                      {joueurs[joueur]} : {type}
                    </li>
                  ))}
                  <PoigneeForm
                    joueurs={joueurs}
                    onSubmit={(v) => {
                      setFieldValue("poignees", [...values.poignees, v]);
                    }}
                  />
                </div>
                {/* <FormControl style={{ marginTop: "0.5rem" }}>
                  <InputLabel id="miseres_tete">Misères de tête ?</InputLabel>
                  <Field multiple component={Select} name="miseres_tete">
                    {joueurs.map((joueur, index) => (
                      <MenuItem key={joueur} value={index}>
                        {joueur}
                      </MenuItem>
                    ))}
                  </Field>
                </FormControl>
                <FormControl style={{ marginTop: "0.5rem" }}>
                  <InputLabel id="miseres_atout">Misères d'atout ?</InputLabel>
                  <Field multiple component={Select} name="miseres_atout">
                    {joueurs.map((joueur, index) => (
                      <MenuItem key={joueur} value={index}>
                        {joueur}
                      </MenuItem>
                    ))}
                  </Field>
                </FormControl> */}
                {/* <Field
                  component={CheckboxWithLabel}
                  type="checkbox"
                  name="petit_au_bout"
                  Label={{ label: "Petit au bout ?" }}
                  color="primary"
                /> */}
                <FormControl style={{ marginTop: "0.5rem" }}>
                  <InputLabel id="petit_au_bout">Petit au bout ?</InputLabel>
                  <Field component={Select} name="petit_au_bout">
                    <MenuItem key="non" value={""}>
                      Non
                    </MenuItem>
                    <MenuItem key="attaque" value={"attaque"}>
                      Attaque
                    </MenuItem>
                    <MenuItem key="defense" value={"defense"}>
                      Défense
                    </MenuItem>
                  </Field>
                </FormControl>
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Valider
                </Button>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RondeButton;
