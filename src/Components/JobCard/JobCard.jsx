import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import { ModeEdit } from "@mui/icons-material";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import EditJobModal from "../EditJobModal/EditJobModal";

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

const JobCard = ({
  desc,
  salaryRange,
  totalRounds,
  positions,
  postedOn,
  id,
  title,
  company,
  fetchJobs,
}) => {
  const [expanded, setExpanded] = useState(false);

  const [openJobModal, setOpenJobModal] = useState(false);

  const handleModalOpen = () => setOpenJobModal(true);
  const handleModalClose = () => setOpenJobModal(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const date = new Date(postedOn);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear().toString();
  const formattedDate = `${day}/${month}/${year}`;

  const keys = [
    "Salary Range :",
    "Total Rounds :",
    "Positions :",
    "Posted On :",
  ];

  const values = [salaryRange, totalRounds, positions, formattedDate];

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  return (
    <Card
      sx={{
        width: "500px",
      }}
    >
      <CardHeader title={title} subheader={company} />
      <CardContent>
        {keys.map((key, i) => {
          return (
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
                {key}
              </Typography>
              <Typography
                sx={{
                  flex: "2",
                }}
              >
                {values[i]}
              </Typography>
            </Box>
          );
        })}
      </CardContent>
      {!expanded && (
        <CardActions disableSpacing>
          <IconButton onClick={handleModalOpen}>
            <ModeEdit />
          </IconButton>
          <Button href={`${id}`}>View</Button>

          <Modal open={openJobModal} onClose={handleModalClose}>
            <Box sx={style}>
              <EditJobModal jobID={id} fetchJobs={fetchJobs} />
            </Box>
          </Modal>

          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
      )}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
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
              {desc}
            </Typography>
          </Box>
        </CardContent>
      </Collapse>
      {expanded && (
        <CardActions disableSpacing>
          <IconButton onClick={handleModalOpen}>
            <ModeEdit />
          </IconButton>
          <Button href={`${id}`}>View</Button>

          <Modal open={openJobModal} onClose={handleModalClose}>
            <Box sx={style}>
              <EditJobModal jobID={id} fetchJobs={fetchJobs} />
            </Box>
          </Modal>

          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
      )}
    </Card>
  );
};

export default JobCard;
