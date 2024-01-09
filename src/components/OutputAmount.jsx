import { Grid, TextField } from "@mui/material";

const OutputAmount = ({ resultCurrency }) => {
  const displayValue = resultCurrency === 0 ? " " : resultCurrency.toFixed(6);
  return (
    <Grid item xs={12}>
      <TextField
        value={displayValue}
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
