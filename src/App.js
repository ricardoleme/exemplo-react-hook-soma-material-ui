import React, { useState, useEffect } from "react";
/* Imports do Material-Ui */
import Avatar from "@material-ui/core/Avatar";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
/* Imports dos ícones */
import Keyboard from "@material-ui/icons/Keyboard";
import Power from "@material-ui/icons/Power";
/* Meus Imports */
import soma from "./soma";

const useStyles = makeStyles(theme => ({
  fundo: {
    marginTop: theme.spacing(2),
    display: "flex", /* Define o elemento como um flex container, tornando os seus filhos flex-itens. */
    flexDirection: "column", /* Define que cada item ficará em coluna, um abaixo do outro */
    alignItems: "center",
    background: theme.palette.common.white
    
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.primary.dark
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  calcular: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: theme.palette.primary.dark
  }
}));

export default function Login() {
  const classes = useStyles(); //estilos do Material-UI

  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [resultado, setResultado] = useState("");
  const [botaoDesabilitado, setBotaoDesabilitado] = useState(true);
  const [helperText, setHelperText] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (num1.trim() && num2.trim()) {
      setBotaoDesabilitado(false);
  //efetuaSoma(num1, num2); /*descomente essa linha e remova o botão calcular ;) */
    } else {
      setBotaoDesabilitado(true);
    }
  }, [num1, num2]);

  function efetuaSoma(num1, num2) {
    if (!Number(num1) || !Number(num2)) {
      setError(true);
      setResultado("");
      setHelperText(
        "Tanto o número 1 e o número 2 devem ser números válidos! "
      );
    } else {
      setError(false);
      setResultado(soma(num1, num2));
      setHelperText("Cálculo efetuado com sucesso!");
    }
  }
  const calcula = e => {
    e.preventDefault(); //Evita que a página seja recarregada
    efetuaSoma(num1, num2);
  };

  return (
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.fundo}>
        <AppBar position="static">
          <Toolbar>
                <Typography type="title" color="inherit" style={{ flex: 1 }}>
                  App Mini Calculadora
                </Typography>
                <Keyboard/>
          </Toolbar>
        </AppBar> 
        <Avatar className={classes.avatar}>
          <Keyboard />
        </Avatar>
        <Typography variant="h5">Mini Calculadora </Typography>
        <form data-testid="soma" className={classes.form} noValidate onSubmit={calcula}>
          <TextField
            variant="outlined"
            margin="normal"
            type="text" /* apenas para teste. Coloque number depois */
            required
            fullWidth
            data-testid="num1"
            label="Número 1"
            name="num1"
            autoFocus
            value={num1}
            onChange={e => setNum1(e.target.value)}
            error={error}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="number"
            step="0.01"
            data-testid="num2"
            label="Número 2"
            name="num2"
            value={num2}
            onChange={e => setNum2(e.target.value)}
            error={error}
          />
          <TextField
            variant="outlined"
            margin="normal"
            disabled={true}
            fullWidth
            data-testid="resultado"
            label="Resultado"
            name="resultado"
            value={resultado}
            helperText={helperText}
            error={error}
          />
          <Button
            data-testid="calcular"
            name="calcular"
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={botaoDesabilitado}
            className={classes.calcular}
          >
            <Keyboard />
            &nbsp; Calcular
          </Button>
          <Grid container>
            <Grid item xs align="center">
              <Chip
                icon={<Power />}
                label="Powered by React & JS"
                clickable
                color="primary"
              />
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
