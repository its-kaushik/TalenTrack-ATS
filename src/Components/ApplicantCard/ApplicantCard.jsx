import {
  Box,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import { baseUrl } from "../../Utils/constants";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import axios from "axios";

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
  async function handleStageChange(endpoint) {
    try {
      const response = await axios.put(
        `${baseUrl}/applications/${endpoint}/${applicationID}`,
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      );

      alert("Status Changed Successfully!");
      fetchApplications();
    } catch (err) {
      console.log();
    }
  }

  return (
    <Card
      sx={{
        width: "500px",
        display: "flex",
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: 151, padding: "10px", borderRadius: "30%" }}
        image={`http://localhost:4000/uploads/profile-default.png`}
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
            sx={{
              flex: 3,
            }}
          >
            Link
          </Link>
        </Box>
        <CardActions>
          <IconButton
            onClick={() => handleStageChange("reject")}
            disabled={round > totalRounds || round === -1 ? true : false}
            sx={{
              color: "red",
            }}
          >
            <CancelIcon />
          </IconButton>

          <IconButton
            onClick={() => handleStageChange("next")}
            disabled={round > totalRounds || round === -1 ? true : false}
            sx={{
              color: "lawngreen",
            }}
          >
            <CheckCircleIcon />
          </IconButton>
        </CardActions>
      </Box>
    </Card>
  );
};

export default ApplicantCard;
