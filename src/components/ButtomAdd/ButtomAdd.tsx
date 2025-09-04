import { Link } from "@mui/material";

const ButtomAdd = () => {
  return (
    <Link
      className="button-add-image"
      sx={{
        textDecoration: "none",
        position: "fixed",
        bottom: 20,
        right: 20,
        backgroundColor: "success.main",
        color: "white",
        padding: "12px 16px",
        borderRadius: "4px",
      }}
      href="/upload"
    >
    </Link>
  );
};

export default ButtomAdd;
