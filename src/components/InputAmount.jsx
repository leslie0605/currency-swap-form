import { Grid, InputAdornment, TextField } from "@mui/material";
import { useContext } from "react";
import { CurrencyContext } from "../context/CurrencyContext";

const InputAmount = () => {
  const { firstAmount, setFirstAmount } = useContext(CurrencyContext);
  return (
    <Grid item xs={12}>
      <TextField
        value={firstAmount}
        onChange={(e) => setFirstAmount(e.target.value)}
        label="Input Amount"
        fullWidth
        InputProps={{
          type: "number",
          startAdornment: <InputAdornment position="start"></InputAdornment>,
        }}
      />
    </Grid>
  );
};

export default InputAmount;
