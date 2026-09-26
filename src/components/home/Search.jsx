import { IoMdSearch } from "react-icons/io";
import { useState } from 'react';
import { Modal, Backdrop, IconButton, TextField, Tooltip, Box } from "@mui/material";

function Search() {
  const [active, setActive] = useState(false);

  return (
    <div>
      <Tooltip title="search">
        <IconButton aria-label="search" size="medium" onClick={() => setActive(true)}>
          <IoMdSearch />
        </IconButton>
      </Tooltip>

      <Modal
        open={active}
        onClose={() => setActive(false)} // Closes on backdrop click OR Escape key
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        sx={{
          display: 'flex',
          // alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* MUI Modal requires a single root wrapper element inside */}
        <Box sx={{ mt: 16, p: 2, height: 400 }}>
          <Box sx={{ p: 2, backgroundColor: "white", maxHeight: 400 }}>
            <TextField
              autoFocus
              type="search"
              id="search"
              label="Search"
              variant="outlined" size="small"
              sx={{ backgroundColor: "white", borderRadius: 1 }}
            />
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default Search;
