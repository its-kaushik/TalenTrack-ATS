import { Box, ButtonBase, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import JobCard from "../../Components/JobCard/JobCard";
import axios from "axios";
import { baseUrl } from "../../Utils/constants";

const userID = localStorage.getItem("userID");

const Jobs = () => {
  const [activeJobs, setActiveJobs] = useState([]);
  const [inactiveJobs, setInactiveJobs] = useState([]);

  const [showActive, setShowActive] = useState(false);
  const [showInactive, setShowInactive] = useState(false);

  function toggleActive() {
    setShowActive(!showActive);
  }

  function toggleInactive() {
    setShowInactive(!showInactive);
    console.log(showInactive);
  }

  const fetchJobs = () => {
    axios
      .get(`${baseUrl}/jobs/?hr=${userID}&isActive=true`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setActiveJobs(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${baseUrl}/jobs/?hr=${userID}&isActive=false`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setInactiveJobs(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (activeJobs === undefined || inactiveJobs === undefined) {
    return <Typography variant="h2">LOADING...</Typography>;
  } else {
    return (
      <Grid
        container
        sx={{
          //backgroundColor: "red",
          padding: "2rem",
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            marginBottom: "3rem",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              textTransform: "uppercase",
            }}
          >
            Job Openings
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <ButtonBase onClick={toggleActive}>
            <Typography
              color="primary"
              variant="h3"
              sx={{
                textTransform: "uppercase",
                marginTop: "2rem",
                marginBottom: "1.5rem",
              }}
            >
              Active Jobs
            </Typography>
          </ButtonBase>
        </Grid>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 5,
          }}
        >
          {showActive &&
            activeJobs.map((job, i) => {
              return (
                <JobCard
                  desc={job.description}
                  salaryRange={job.salaryRange}
                  totalRounds={job.totalRounds}
                  positions={job.positions}
                  postedOn={job.createdAt}
                  id={job._id}
                  title={job.title}
                  company={job.hr.company}
                  fetchJobs={fetchJobs}
                />
              );
            })}
        </Box>
        <Grid item xs={12}>
          <ButtonBase onClick={toggleInactive}>
            <Typography
              color="primary"
              variant="h3"
              sx={{
                textTransform: "uppercase",
                marginTop: "4rem",
                marginBottom: "1.5rem",
              }}
            >
              Inactive Jobs
            </Typography>
          </ButtonBase>
        </Grid>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 5,
          }}
        >
          {showInactive &&
            inactiveJobs.map((job, i) => {
              return (
                <JobCard
                  desc={job.description}
                  salaryRange={job.salaryRange}
                  totalRounds={job.totalRounds}
                  positions={job.positions}
                  postedOn={job.createdAt}
                  id={job._id}
                  title={job.title}
                  company={job.hr.company}
                  fetchJobs={fetchJobs}
                />
              );
            })}
        </Box>
      </Grid>
    );
  }
};

export default Jobs;
