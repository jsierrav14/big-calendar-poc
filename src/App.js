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

    setEvents( [...myEvents, { start, end, title }]);
    console.log('EVENTS --->',  { start, end, title })
    setOpen(false)

  }

  const moveEvent = useCallback(
    ({ event, start, end, isAllDay: droppedOnAllDaySlot = false }) => {
      const { allDay } = event
      if (!allDay && droppedOnAllDaySlot) {
        event.allDay = true
      }

      setEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {}
        const filtered = prev.filter((ev) => ev.id !== event.id)
        return [...filtered, { ...existing, start, end, allDay }]
      })
    },
    [setEvents]
  )


  const resizeEvent = useCallback(
    ({ event, start, end }) => {
      setEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {}
        const filtered = prev.filter((ev) => ev.id !== event.id)
        return [...filtered, { ...existing, start, end }]
      })
    },
    [setEvents]
  )


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
          <TextField id="standard-basic" label="Title" variant="standard" onChange={(e)=>setTitle(e.target.value)} />
          <TextField id="standard-basic" label="Start" variant="standard" value={start} />
          <TextField id="standard-basic" label="End" variant="standard" value={end}/>
          <FormControlLabel control={<Checkbox defaultChecked />} label="All day" />
           
          <Button variant="contained" onClick={handleCreateEvent}>Create</Button>

          </Box>
        </Box>
      </Modal>
      <Calendar
        events={myEvents}
        startAccessor="start"
        endAccessor="end"
        localizer={localizer}
        style={{ height: 800 }}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
        onEventDrop={moveEvent}
          onEventResize={resizeEvent}
        scrollToTime={scrollToTime}
      />
    </div>
  );
}

export default App;
