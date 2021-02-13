import React, { useState } from "react";

import { Button, MenuItem, Select } from "@material-ui/core";

const PoigneeForm = ({ onSubmit, joueurs }) => {
  const [joueur, setJoueur] = useState("");
  const [type, setType] = useState("");

  return (
    <div>
      <Select
        style={{ minWidth: "6rem", marginRight: "1rem" }}
        onChange={(e) => {
          setJoueur(e.target.value);
        }}
        value={joueur}
      >
        {joueurs.map((joueur, index) => (
          <MenuItem key={joueur} value={index}>
            {joueur}
          </MenuItem>
        ))}
      </Select>
      <Select
        style={{ minWidth: "6rem", marginRight: "1rem" }}
        onChange={(e) => {
          setType(e.target.value);
        }}
        value={type}
      >
        <MenuItem key={"simple"} value={"simple"}>
          Simple (8)
        </MenuItem>
        <MenuItem key={"double"} value={"simple"}>
          Double (10)
        </MenuItem>
        <MenuItem key={"triple"} value={"triple"}>
          Triple (13)
        </MenuItem>
      </Select>
      <Button
        disabled={joueur == null || !type}
        onClick={() => {
          onSubmit({ type, joueur });
        }}
      >
        Ajouter
      </Button>
    </div>
  );
};

export default PoigneeForm;
