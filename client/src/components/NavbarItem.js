import React, { useState } from "react";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import { NavLink } from "react-router-dom";

function NavbarItem({ item }) {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div>
      <ListItemButton onClick={handleClick} sx={{height: 80}}>
        <ListItemText primary={item.title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="li" disablePadding sx={{bgcolor: '#000051'}}>
          {item.subNav.map((element) => {
            return (
              <ListItemButton key={element.id} sx={{ pl: 4 }} component={NavLink} to={element.path}>
                <ListItemText primary={element.title} />
              </ListItemButton>
            );
          })}
        </List>
      </Collapse>
      <Divider sx={{bgcolor: "#ffffff"}}/>
    </div>
  );
}

export default NavbarItem;
