import "./App.css";
import React, { Fragment, useState, useCallback, useMemo } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { events } from "./mocks/events.mock";
import { TextField } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function App() {
  const [myEvents, setEvents] = useState(events);
  const [open, setOpen] = useState(false);
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [title, setTitle] = useState();


  const localizer = momentLocalizer(moment); // or globalizeLocalizer
  const handleSelectSlot = useCallback(({ start, end }) => {
    setOpen(true);
    setEnd(end)
    setStart(start);
    /*
      const title = window.prompt("New Event name");
      if (title) {
        setEvents((prev) => [...prev, { start, end, title }]);
      }*/
  });

  const handleSelectEvent = useCallback(
    (event) => window.alert(event.title),
    []
  );

  const handleCreateEvent = ()=>{
    setEvents((prev) => [...prev, { start, end, title }]);
    setOpen(false)

  }

  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(2015, 3, 12),
      scrollToTime: new Date(1970, 1, 1, 6),
    }),
    []
  );
  return (
    <div className="App">
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Event
          </Typography>
          
          <Box sx={{display:'flex', flexDirection:'column'}}>
          <TextField id="standard-basic" label="Title" variant="standard" onChange={(e)=>setTitle(e.target.vale)} />
          <TextField id="standard-basic" label="Start" variant="standard" />
          <TextField id="standard-basic" label="End" variant="standard" />
          <FormControlLabel control={<Checkbox defaultChecked />} label="All day" />
           
          <Button variant="contained" onClick={handleCreateEvent}>Create</Button>

          </Box>
        </Box>
      </Modal>
      <Calendar
        events={events}
        startAccessor="start"
        endAccessor="end"
        localizer={localizer}
        style={{ height: 500 }}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
        scrollToTime={scrollToTime}
      />
    </div>
  );
}

export default App;
