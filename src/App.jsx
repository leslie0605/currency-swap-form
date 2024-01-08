import { Grid, Container, Typography, Box } from "@mui/material";
import InputAmount from "./components/InputAmount";
import SelectCurrency from "./components/SelectCurrency";
import SwitchCurrency from "./components/SwitchCurrency";
import { useContext, useEffect, useState } from "react";
import { CurrencyContext } from "./context/CurrencyContext";
import axios from "axios";

function App() {
  const {
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    firstAmount,
  } = useContext(CurrencyContext);
  const [resultCurrency, setResultCurrency] = useState(0);

  useEffect(() => {
    if (firstAmount) {
      axios("https://interview.switcheo.com/prices.json")
        .then((response) => {
          const fromCurrencyPrice = response.data.find(
            (item) => item.currency === fromCurrency
          )?.price;
          const toCurrencyPrice = response.data.find(
            (item) => item.currency === toCurrency
          )?.price;

          if (fromCurrencyPrice && toCurrencyPrice) {
            const result = firstAmount * (toCurrencyPrice / fromCurrencyPrice);
            setResultCurrency(result);
          }
        })
        .catch((error) => console.log(error));
    }
  }, [firstAmount, fromCurrency, toCurrency]);

  const boxStyles = {
    background: "#fdfdfd",
    marginTop: "10rem",
    textAlign: "center",
    color: "#222",
    minHeight: "20rem",
    borderRadius: 2,
    padding: "4rem 2rem",
    boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
    position: "relative",
  };

  return (
    <Container maxWidth="md" sx={boxStyles}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ marginBottom: "2rem" }}
      >
        <img
          src="/switcheo.png"
          alt="Switcheo Logo"
          style={{ maxWidth: "50px", marginRight: "1rem" }}
        />
        <Typography variant="h5">Cryptocurrency Swap Form</Typography>
      </Box>

      <Grid container spacing={2}>
        <InputAmount />
        <SelectCurrency
          value={fromCurrency}
          setValue={setFromCurrency}
          label="From"
        />
        <SwitchCurrency />
        <SelectCurrency
          value={toCurrency}
          setValue={setToCurrency}
          label="To"
        />
      </Grid>
      {firstAmount ? (
        <Box sx={{ marginTop: "2rem" }}>
          <Typography
            variant="h5"
            sx={{ marginTop: "5px", fontWeight: "bold" }}
          >
            {firstAmount} {fromCurrency} = {resultCurrency} {toCurrency}
          </Typography>
        </Box>
      ) : (
        ""
      )}
    </Container>
  );
}

export default App;
