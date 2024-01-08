import {
  Autocomplete,
  Grid,
  TextField,
  Skeleton,
  Box,
  InputAdornment,
} from "@mui/material";
import useAxios from "../hooks/useAxios";
import { Fragment } from "react";

const SelectCurrency = (props) => {
  const { value, setValue, label } = props;
  const [token, loaded, error] = useAxios(
    "https://interview.switcheo.com/prices.json"
  );

  if (loaded) {
    return (
      <Grid item xs={12} md={3}>
        <Skeleton variant="rounded" height={60} />
      </Grid>
    );
  }
  if (error) {
    return "Something went wrong!";
  }

  const dataToken = token.reduce((acc, item) => {
    if (
      ("price" in item && !acc[item.currency]) ||
      new Date(item.date) > new Date(acc[item.currency].date)
    ) {
      acc[item.currency] = item;
    }
    return acc;
  }, {});
  const tokenCurrency = Object.values(dataToken)
    .map(({ currency }) => currency)
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));

  return (
    <Grid item xs={12} md={3}>
      <Autocomplete
        value={value}
        disableClearable
        onChange={(event, newValue) => setValue(newValue)}
        options={tokenCurrency}
        renderOption={(props, option) => (
          <Box component="li" {...props}>
            <img
              src={`/tokens/${option}.svg`}
              alt={option}
              style={{ width: 24, height: 24, marginRight: 8 }}
            />
            {option}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <img
                    src={`/tokens/${value}.svg`}
                    alt={value}
                    style={{ width: 24, height: 24, marginRight: 8 }}
                  />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </Grid>
  );
};

export default SelectCurrency;
