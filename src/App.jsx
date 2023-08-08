import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Button,
  Modal,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  borderRadius: 3,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function App() {
  const [type, setType] = useState();
  const [why, setWhy] = useState();
  const [value, setValue] = useState();
  const [ID, setID] = useState();
  const [isSending, setIsSending] = useState();
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    const result = event.target.value.replace(/\D/g, "");

    setValue(result);
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = async () => {
    if (!why) {
      toast.error("Please type why!");
    } else if (!type) {
      toast.error("Please type type!");
    } else if (!value) {
      toast.error("Please type value!");
    } else if (!ID) {
      toast.error("Please type In-game ID!");
    } else {
      const id = toast.loading("Sending...");
      setIsSending(true);
      await axios
        .get(
          `https://ducanh-api-gateway.onrender.com/v1?why=${why}&value=${value}&type=${type}&id=${ID}`
        )
        .then((response) => {
          toast.update(id, {
            render: "Send Success!",
            type: "success",
            isLoading: false,
            autoClose: 2000,
          });
          setIsSending(false);
        })
        .catch((err) => {
          toast.update(id, {
            render: "Something went wrong!",
            type: "error",
            isLoading: false,
            autoClose: 2000,
          });
          setIsSending(false);
        });
    }
  };

  return (
    <div className="container">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Message
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Open Beta đã đóng. Nếu muốn mua vui lòng liên hệ{" "}
            <Link
              color="inherit"
              href="https://facebook.com/xuanbachdotdev"
              target="_blank"
            >
              Facebook
            </Link>
            <br />
            Mua đứt source code 350k
            <br /> Thuê theo tuần 70k
          </Typography>
        </Box>
      </Modal>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <CssBaseline />
        <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
          <Typography variant="h3" component="h1" gutterBottom>
            ElDorado Mailbox Send
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom></Typography>
          <Typography variant="body1">
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                label="Type"
                onChange={(e) => {
                  setType(e.target.value);
                  setValue("");
                }}
              >
                <MenuItem value="CLOUD">Cloud Piece</MenuItem>
                <MenuItem value="RUBY">Ruby</MenuItem>
                <MenuItem value="GOLD">Gold</MenuItem>
                <MenuItem value="BP">BP</MenuItem>
                <MenuItem value="CHAR">Charactor</MenuItem>
                <MenuItem value="ITEM">Item</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ mt: 2 }} fullWidth>
              <InputLabel>Why?</InputLabel>
              <OutlinedInput
                label="Why?"
                value={why}
                onChange={(e) => setWhy(e.target.value)}
              />
            </FormControl>
            {type === "CHAR" ? (
              <>
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel>Charactor Code</InputLabel>
                  <OutlinedInput
                    label="Charactor Code"
                    value={value}
                    onChange={handleChange}
                  />
                </FormControl>
              </>
            ) : type === "ITEM" ? (
              <>
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel>Item Code</InputLabel>
                  <OutlinedInput
                    label="Item Code"
                    value={value}
                    onChange={handleChange}
                  />
                </FormControl>
              </>
            ) : (
              <FormControl sx={{ mt: 2 }} fullWidth>
                <InputLabel>Value</InputLabel>
                <OutlinedInput
                  label="Value"
                  value={value}
                  onChange={handleChange}
                />
              </FormControl>
            )}
            <FormControl sx={{ mt: 2 }} fullWidth>
              <InputLabel>In-game ID</InputLabel>
              <OutlinedInput
                label="In-game ID"
                value={ID}
                onChange={(e) => setID(e.target.value)}
              />
            </FormControl>
            <Box sx={{ mt: 2 }} textAlign="center">
              <Button
                disabled={isSending}
                sx={{ width: 100 }}
                variant="contained"
                onClick={() => handleSubmit()}
              >
                Send
              </Button>
            </Box>
          </Typography>
        </Container>
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: "auto",
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
          }}
        >
          <Container maxWidth="sm">
            <Typography variant="body1">ElDorado Mailbox Send</Typography>
            <Typography variant="body2" color="text.secondary">
              {"Copyright © "}
              <Link
                color="inherit"
                href="https://facebook.com/xuanbachdotdev"
                target="_blank"
              >
                XuanBachDotDev
              </Link>
              {new Date().getFullYear()}
            </Typography>
          </Container>
        </Box>
      </Box>
    </div>
  );
}

export default App;
