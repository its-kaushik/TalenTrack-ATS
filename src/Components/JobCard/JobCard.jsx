import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  Typography,
} from "@mui/material";
import { ModeEdit } from "@mui/icons-material";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";

const JobCard = ({
  desc,
  salaryRange,
  totalRounds,
  positions,
  postedOn,
  id,
  title,
  company,
}) => {
  const [expanded, setExpanded] = useState(false);

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
          <IconButton href={`edit/${id}`}>
            <ModeEdit />
          </IconButton>
          <Button href={`${id}`}>View</Button>

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
          <IconButton href={`edit/${id}`}>
            <ModeEdit />
          </IconButton>
          <Button href={`${id}`}>View</Button>

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
