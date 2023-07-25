import { Box, Typography } from "@mui/material";
import ApplicantCard from "../ApplicantCard/ApplicantCard";

const Applications = ({
  round,
  applications,
  totalRounds,
  fetchApplications,
}) => {
  let headingTitle = "";

  if (round === totalRounds + 1) {
    headingTitle = "Selected";
  } else if (round === -1) {
    headingTitle = "Rejected";
  } else if (round === 0) {
    headingTitle = "Applied";
  } else {
    headingTitle = `Round-${round}`;
  }

  return (
    <Box>
      <Typography variant="h3" mt={5} mb={2}>
        {headingTitle}
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 5,
          flexWrap: "wrap",
        }}
      >
        {applications.map((application, i) => {
          return (
            <ApplicantCard
              name={application.applicant.name}
              email={application.applicant.email}
              applicationID={application._id}
              status={application.status}
              totalRounds={totalRounds}
              round={application.round}
              resumeLink={application.applicant.resume}
              fetchApplications={fetchApplications}
              profileLink={application.applicant.profile}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default Applications;
