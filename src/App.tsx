import React from "react";
import Typography from "@material-ui/core/Typography";

import StarWarsVehiclesGrid from "./pages/starWarsVehicleGrid";

export default function App() {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Typography align="center" variant="h2">
        Vehicles
      </Typography>
      <StarWarsVehiclesGrid />
    </div>
  );
}
