import {
  Box,
  Button,
  ButtonBase,
  Grid,
  Link,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import CreateIcon from "@mui/icons-material/Create";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../Utils/constants";
import CreateJobModal from "../../Components/CreateJobModal/CreateJobModal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Home = () => {
  const [name, setName] = useState("");
  const [openJobModal, setOpenJobModal] = useState(false);

  const handleModalOpen = () => setOpenJobModal(true);
  const handleModalClose = () => setOpenJobModal(false);

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
            <Button
              onClick={handleModalOpen}
              color="primary"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                fontSize: "large",
              }}
            >
              <CreateIcon
                color="primary"
                sx={{
                  marginRight: "10px",
                }}
              />
              CREATE A NEW JOB LISTING
            </Button>
            <Modal
              open={openJobModal}
              onClose={handleModalClose}
              //aria-labelledby="modal-modal-title"
              //aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <CreateJobModal />
              </Box>
            </Modal>

            <Button
              color="primary"
              href="/jobs/all"
              sx={{
                display: "flex",
                alignItems: "center",
                fontSize: "large",
                justifyContent: "start",
              }}
            >
              <WorkIcon
                sx={{
                  marginRight: "10px",
                }}
              />
              VIEW ALL JOBS
            </Button>
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
