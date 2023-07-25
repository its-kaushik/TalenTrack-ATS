import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../Utils/constants";
import Applications from "../../Components/Applications/Applications";

const SingleJob = () => {
  const { jobID } = useParams();

  const [job, setJob] = useState();

  const [groupedByStageApps, setGroupedByStageApps] = useState([]);

  function fetchApplications() {
    console.log(jobID);

    axios
      .get(`${baseUrl}/applications/byGroup?job=${jobID}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setGroupedByStageApps(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function fetchJob() {
    console.log(jobID);

    axios
      .get(`${baseUrl}/jobs/${jobID}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setJob(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchJob();

    fetchApplications();
  }, []);

  if (job === undefined || groupedByStageApps === undefined) {
    return <Typography variant="h3">Loading....</Typography>;
  } else {
    return (
      <Box
        sx={{
          padding: "2rem",
        }}
      >
        <Card
          sx={{
            width: "500px",
          }}
        >
          <CardHeader title={job.title} subheader={job.hr.company} />
          <CardContent>
            <Box
              sx={{
                display: "flex",
                marginBottom: "10px",
              }}
            >
              <Typography
                sx={{
                  flex: "1",
                }}
              >
                Description :
              </Typography>
              <Typography
                sx={{
                  flex: "2",
                }}
              >
                {job.description}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                marginBottom: "10px",
              }}
            >
              <Typography
                sx={{
                  flex: "1",
                }}
              >
                Salary Range :
              </Typography>
              <Typography
                sx={{
                  flex: "2",
                }}
              >
                {job.salaryRange}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                marginBottom: "10px",
              }}
            >
              <Typography
                sx={{
                  flex: "1",
                }}
              >
                Total Rounds :
              </Typography>
              <Typography
                sx={{
                  flex: "2",
                }}
              >
                {job.totalRounds}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                marginBottom: "10px",
              }}
            >
              <Typography
                sx={{
                  flex: "1",
                }}
              >
                Positions :
              </Typography>
              <Typography
                sx={{
                  flex: "2",
                }}
              >
                {job.positions}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                marginBottom: "10px",
              }}
            >
              <Typography
                sx={{
                  flex: "1",
                }}
              >
                Posted On :
              </Typography>
              <Typography
                sx={{
                  flex: "2",
                }}
              >
                {job.createdAt.substring(0, 10)}
              </Typography>
            </Box>
          </CardContent>
        </Card>
        <Box>
          {groupedByStageApps.map((stage, i) => {
            return (
              <Applications
                round={stage["_id"]}
                applications={stage.applications}
                totalRounds={job.totalRounds}
                fetchApplications={fetchApplications}
              />
            );
          })}
        </Box>
      </Box>
    );
  }
};

export default SingleJob;
