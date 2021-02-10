import React, { useState } from "react";

import {
  Button,
  Dialog,
  DialogContent,
  FormControl,
  InputLabel,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Field, Form } from "formik";
import { Select, TextField } from "formik-material-ui";
import * as yup from "yup";

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
            })}
          >
            {({ isSubmitting, errors }) => (
              console.log("errors", errors),
              (
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

                  <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Valider
                  </Button>
                </Form>
              )
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RondeButton;
