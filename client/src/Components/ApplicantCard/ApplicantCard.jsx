import {
  Alert,
  Box,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { baseDataUrl, baseUrl } from "../../Utils/constants";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import axios from "axios";
import { useState } from "react";

function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}

const ApplicantCard = ({
  name,
  email,
  applicationID,
  status,
  totalRounds,
  round,
  resumeLink,
  fetchApplications,
  profileLink,
}) => {
  const [statusChangeSuccess, setStatusChangeSuccess] = useState();

  /* async function handleStageChange(endpoint) {
    try {
      const response = await axios.put(
        `${baseUrl}/applications/${endpoint}/${applicationID}`,
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      );

      setStatusChangeSuccess("Status Changed Successfully!");
      fetchApplications();
      await timeout(2000);
      setStatusChangeSuccess(null);
    } catch (err) {
      console.log(err);
    }
  } */

  async function handleNextStage() {
    try {
      let body;

      if (round === totalRounds) {
        body = {
          status: "accepted",
          lastround: "accepted",
          round: round + 1,
        };
      } else {
        body = {
          status: "in-progress",
          lastround: `round-${round}`,
          round: round + 1,
        };
      }

      const response = await axios.put(
        `${baseUrl}/applications/${applicationID}`,
        body,
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      );

      setStatusChangeSuccess("Status Changed Successfully!");
      fetchApplications();
      await timeout(2000);
      setStatusChangeSuccess(null);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleRejectApplication() {
    try {
      const body = {
        status: "rejected",
        lastround: `round-${round}`,
        round: -1,
      };

      const response = await axios.put(
        `${baseUrl}/applications/${applicationID}`,
        body,
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      );

      setStatusChangeSuccess("Status Changed Successfully!");
      fetchApplications();
      await timeout(2000);
      setStatusChangeSuccess(null);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Card
      sx={{
        width: "550px",
        display: "flex",
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: 200, padding: "5px" }}
        image={`${profileLink}`}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          //backgroundColor: "yellow",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <CardHeader title="Applicant Details" />

        <Box
          sx={{
            display: "flex",
            padding: "10px",
            //backgroundColor: "red",
            width: "100%",
          }}
        >
          <Typography
            sx={{
              flex: 1,
              fontWeight: "bold",
              //backgroundColor: "red",
            }}
          >
            Name :
          </Typography>
          <Typography
            sx={{
              flex: 3,
            }}
          >
            {name}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            padding: "10px",
            //backgroundColor: "red",
            width: "100%",
          }}
        >
          <Typography
            sx={{
              flex: 1,
              fontWeight: "bold",
              //backgroundColor: "red",
            }}
          >
            Email :
          </Typography>
          <Typography
            sx={{
              flex: 3,
            }}
          >
            {email}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            padding: "10px",
            //backgroundColor: "red",
            width: "100%",
          }}
        >
          <Typography
            sx={{
              flex: 1,
              fontWeight: "bold",
              //backgroundColor: "red",
            }}
          >
            Resume :
          </Typography>
          <Link
            href={`${resumeLink}`}
            sx={{
              flex: 3,
            }}
          >
            Link
          </Link>
        </Box>
        <Box
          sx={{
            display: "flex",
            padding: "10px",
            //backgroundColor: "red",
            width: "100%",
          }}
        >
          <Typography
            sx={{
              flex: 1,
              fontWeight: "bold",
              //backgroundColor: "red",
            }}
          >
            Round :
          </Typography>
          <Typography
            sx={{
              flex: 3,
            }}
          >
            {round}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            padding: "10px",
            //backgroundColor: "red",
            width: "100%",
          }}
        >
          <Typography
            sx={{
              flex: 1,
              fontWeight: "bold",
              //backgroundColor: "red",
            }}
          >
            Status :
          </Typography>
          <Typography
            sx={{
              flex: 3,
            }}
          >
            {status}
          </Typography>
        </Box>
        <CardActions>
          <IconButton
            onClick={handleRejectApplication}
            disabled={round > totalRounds || round === -1 ? true : false}
            sx={{
              color: "red",
            }}
          >
            <CancelIcon />
          </IconButton>

          <IconButton
            onClick={handleNextStage}
            disabled={round > totalRounds || round === -1 ? true : false}
            sx={{
              color: "lawngreen",
            }}
          >
            <CheckCircleIcon />
          </IconButton>
          {statusChangeSuccess && (
            <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
              <Alert severity="success" size="small">
                {statusChangeSuccess}
              </Alert>
            </Stack>
          )}
        </CardActions>
        {/* Show Success if no issues */}
      </Box>
    </Card>
  );
};

export default ApplicantCard;
