import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
// import MenuIcon from "@mui/icons-material/Menu";
// import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
// import AdbIcon from "@mui/icons-material/Adb";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { loggingOut } from "../store/slices/userSlice";

function Navbar2() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [settings, setSettings] = useState(["logout"]);
  //   const [pages, setPages] = useState(["About"]);
  const user = useSelector((state) => state.user.isSignedIn);
  const userName = useSelector((state) => state.user.name);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const path = window.location.pathname;
  console.log(path);

  //   useEffect(() => {
  //     if (user) setSettings(["logout"]);
  //     else setSettings(["login", "signup"]);
  //   }, [user]);

  //   useEffect(() => {
  //     if (user) setPages(["Home", "About"]);
  //     else setPages(["About"]);
  //   }, [user]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {
    switch (page) {
      case "Home":
        if (user) navigate("/home");
        break;
      case "About":
        navigate("/about");
        break;

      default:
    }
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (setting) => {
    switch (setting) {
      case "logout":
        dispatch(loggingOut());
        navigate("/");
        break;
      case "signup":
        navigate("/signup");
        break;
      case "login":
        navigate("/signin");
        break;
      default:
    }
    setAnchorElUser(null);
  };

  return (
    <div className="flex px-2 md:px-6 justify-between min-w-full bg-white text py-4 shadow-2xl items-center text-[#5A5E62]">
      <div
        className=" text-2xl flex ml-2 md:ml-8 items-center gap-2 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src="/resources/icon.png" alt="" className=" max-w-[45px]" />
        <span>NOTESHARE</span>
      </div>
      {path === "/" ? (
        <ul className="flex items-center gap-2 md:gap-9 text-[#1A72E9]">
          <li className=" cursor-pointer">Features</li>
          <li className=" cursor-pointer ">
            <Link
              to="/signup"
              className="bg-[#1A72E9] text-white rounded-lg px-4 py-2 font-semibold"
            >
              Get Started
            </Link>
          </li>
        </ul>
      ) : (
        <Box sx={{ flexGrow: 0 }} className=" ml-auto">
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseNavMenu}
          >
            {settings.map((setting) => (
              <MenuItem
                key={setting}
                onClick={() => handleCloseUserMenu(setting)}
              >
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      )}
    </div>
  );
}

export default Navbar2;
