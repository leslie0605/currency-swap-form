import { Grid, Container, Typography, Box, Button } from "@mui/material";
import InputAmount from "./components/InputAmount";
import SelectCurrency from "./components/SelectCurrency";
import SwitchCurrency from "./components/SwitchCurrency";
import { useContext, useEffect, useState } from "react";
import { CurrencyContext } from "./context/CurrencyContext";
import axios from "axios";
import OutputAmount from "./components/OutputAmount";
import SubmitButton from "./components/SubmitButton";

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
            const result = firstAmount * (fromCurrencyPrice / toCurrencyPrice);
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
        sx={{ marginBottom: "3rem" }}
      >
        <img
          src="/switcheo.png"
          alt="Switcheo Logo"
          style={{ maxWidth: "50px", marginRight: "1rem" }}
        />
        <Typography variant="h4">Cryptocurrency Swap Form</Typography>
      </Box>

      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={4} md={4}>
          <InputAmount />
        </Grid>
        <Grid item xs={12} sm={3} md={3}>
          <SelectCurrency
            value={fromCurrency}
            setValue={setFromCurrency}
            label="From"
          />
        </Grid>

        <Grid item xs={12}>
          <SwitchCurrency />
        </Grid>

        <Grid item xs={12} sm={4} md={4}>
          <OutputAmount resultCurrency={resultCurrency} />
        </Grid>

        <Grid item xs={12} sm={3} md={3}>
          <SelectCurrency
            value={toCurrency}
            setValue={setToCurrency}
            label="To"
          />
        </Grid>
        <Grid item xs={12} sm={7} md={7}>
          {firstAmount ? (
            <Typography
              sx={{ textAlign: "left", marginTop: "1rem", fontSize: 18 }}
            >
              Exchange Rate: 1 {fromCurrency} = {resultCurrency / firstAmount}{" "}
              {toCurrency}
            </Typography>
          ) : null}
        </Grid>
        <Grid item xs={12} sm={7} md={7} sx={{ marginTop: "1rem" }}>
          <SubmitButton></SubmitButton>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
