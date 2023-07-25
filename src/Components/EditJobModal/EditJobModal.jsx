import WorkIcon from "@mui/icons-material/Work";
import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../Utils/constants";

const {
  Container,
  Box,
  Avatar,
  Typography,
  Grid,
  TextField,
  Slider,
  Input,
  Button,
  Stack,
  Alert,
} = require("@mui/material");

const EditJobModal = ({ jobID, fetchJobs }) => {
  const [title, setTitle] = useState();
  const [titleError, setTitleError] = useState(false);
  const handleTitle = () => {
    if (!title || title.length < 1) {
      setTitleError(true);
      return;
    }
    setTitleError(false);
  };

  const [description, setDescription] = useState();
  const [descriptionError, setDescriptionError] = useState(false);
  const handleDescription = () => {
    if (!description || description.length < 1) {
      setDescriptionError(true);
      return;
    }
    setDescriptionError(false);
  };

  const [salaryRange, setSalaryRange] = useState();
  const [salaryRangeError, setSalaryRangeError] = useState(false);
  const handleSalaryRange = () => {
    if (!salaryRange || salaryRange.length < 1) {
      setSalaryRangeError(true);
      return;
    }
    setSalaryRangeError(false);
  };

  const [posValue, setPosValue] = useState(1);
  const [roundValue, setRoundValue] = useState(1);

  const handlePosSliderChange = (event, newValue) => {
    setPosValue(newValue);
  };

  const handleRoundSliderChange = (event, newValue) => {
    setRoundValue(newValue);
  };

  const handlePosInputChange = (event) => {
    setPosValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleRoundInputChange = (event) => {
    setRoundValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handlePosBlur = () => {
    if (posValue < 1) {
      setPosValue(1);
    } else if (posValue > 20) {
      setPosValue(20);
    }
  };

  const handleRoundBlur = () => {
    if (roundValue < 1) {
      setRoundValue(1);
    } else if (roundValue > 10) {
      setRoundValue(10);
    }
  };

  const [formValid, setFormValid] = useState();
  const [success, setSuccess] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSuccess(null);

    if (titleError) {
      setFormValid("Please Enter Title");
      return;
    }

    if (descriptionError) {
      setFormValid("Please Enter Description");
      return;
    }

    if (salaryRangeError) {
      setFormValid("Please Enter Salary Range");
      return;
    }

    try {
      const response = await axios.put(
        `${baseUrl}/jobs/${jobID}`,
        {
          title,
          description,
          salaryRange,
          totalRounds: roundValue,
          positions: posValue,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      );

      setSuccess("Job Post Edited Successfully !");
      fetchJobs();
    } catch (err) {
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx

        setFormValid(err.response.data.message);
      } else if (err.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js

        console.log(err.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", err.message);
      }
    }
  };

  useEffect(() => {
    axios
      .get(`${baseUrl}/jobs/${jobID}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        const job = response.data.data;

        setTitle(job.title);
        setDescription(job.description);
        setSalaryRange(job.salaryRange);
        setPosValue(job.positions);
        setRoundValue(job.totalRounds);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{
            m: 1,
            bgcolor: "secondary.main",
          }}
        >
          <WorkIcon />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
          sx={{
            textTransform: "uppercase",
          }}
        >
          Edit Job
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                autoComplete="title"
                defaultValue="Title"
                //autoFocus
                value={title}
                error={titleError}
                onBlur={handleTitle}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="description"
                label="Description"
                name="description"
                autoComplete="description"
                defaultValue="Description"
                //autoFocus
                value={description}
                error={descriptionError}
                onBlur={handleDescription}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="salaryRange"
                label="Salary Range"
                name="salaryRange"
                autoComplete="salaryRange"
                defaultValue="SalaryRange"
                //autoFocus
                value={salaryRange}
                error={salaryRangeError}
                onBlur={handleSalaryRange}
                onChange={(event) => {
                  setSalaryRange(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>Positions</Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <WorkIcon />
                </Grid>
                <Grid item xs>
                  <Slider
                    value={typeof posValue === "number" ? posValue : 1}
                    onChange={handlePosSliderChange}
                    min={1}
                    defaultValue={1}
                    max={20}
                    valueLabelDisplay="auto"
                  />
                </Grid>
                <Grid item>
                  <Input
                    value={posValue}
                    size="small"
                    onChange={handlePosInputChange}
                    onBlur={handlePosBlur}
                    inputProps={{
                      step: 1,
                      min: 0,
                      max: 20,
                      type: "number",
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography>Rounds</Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <FlagCircleIcon />
                </Grid>
                <Grid item xs>
                  <Slider
                    value={typeof roundValue === "number" ? roundValue : 1}
                    onChange={handleRoundSliderChange}
                    min={1}
                    defaultValue={1}
                    max={10}
                    valueLabelDisplay="auto"
                  />
                </Grid>
                <Grid item>
                  <Input
                    value={roundValue}
                    size="small"
                    onChange={handleRoundInputChange}
                    onBlur={handleRoundBlur}
                    inputProps={{
                      step: 1,
                      min: 0,
                      max: 10,
                      type: "number",
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
            }}
          >
            Submit
          </Button>

          {/* Show Form Error if any */}
          {formValid && (
            <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
              <Alert severity="error" size="small">
                {formValid}
              </Alert>
            </Stack>
          )}

          {/* Show Success if no issues */}
          {success && (
            <Stack sx={{ width: "100%", paddingTop: "10px" }} spacing={2}>
              <Alert severity="success" size="small">
                {success}
              </Alert>
            </Stack>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default EditJobModal;
