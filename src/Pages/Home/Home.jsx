import { Box, Grid, Link, Paper, Typography } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import CreateIcon from "@mui/icons-material/Create";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../Utils/constants";

const Home = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    axios
      .get(`${baseUrl}/auth/profile`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setName(response.data.data.name);
      })
      .catch((err) => {
        if (err.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
        } else if (err.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js

          console.log(err.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", err.message);
        }
      });
  }, []);

  return (
    <Box
      sx={{
        padding: "20px",
      }}
    >
      <Box
        sx={{
          marginBottom: "50px",
        }}
      >
        <Typography variant="h4">Welcome,</Typography>
        <Typography
          variant="h3"
          sx={{
            textTransform: "uppercase",
          }}
        >
          {name}
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid item>
          <Paper
            elevation={5}
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: "2.5rem",
            }}
          >
            <Link
              underline="none"
              variant="button"
              href="/jobs/create"
              sx={{
                display: "flex",
                alignItems: "center",
                fontSize: "large",
              }}
            >
              <CreateIcon
                sx={{
                  marginRight: "10px",
                }}
              />
              CREATE A NEW JOB LISTING
            </Link>

            <Link
              underline="none"
              variant="button"
              href="/jobs/all"
              sx={{
                display: "flex",
                alignItems: "center",
                fontSize: "large",
              }}
            >
              <WorkIcon
                sx={{
                  marginRight: "10px",
                }}
              />
              VIEW ALL JOBS
            </Link>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;

{
  /* <Container
      maxWidth="md"
      sx={
        {
          //backgroundColor: "yellow",
        }
      }
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          //backgroundColor: "red",
        }}
      >
        <Typography variant="button">CREATE A NEW JOB LISTING</Typography>

        <Typography variant="button">VIEW EXISTING JOBS</Typography>
      </Box>
    </Container> */
}
