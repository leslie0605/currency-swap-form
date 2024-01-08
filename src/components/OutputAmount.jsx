import { Grid, TextField } from "@mui/material";

const OutputAmount = ({ resultCurrency }) => {
  return (
    <Grid item xs={12}>
      <TextField
        value={resultCurrency.toFixed(6)}
        label="Converted Amount"
        fullWidth
        InputProps={{
          readOnly: true,
        }}
      />
    </Grid>
  );
};

export default OutputAmount;
