import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Protected(props) {
  const { Component } = props;
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      window.location.replace("/signin");
    }
  }, [navigate]);

  return <Component />;
}

export default Protected;
