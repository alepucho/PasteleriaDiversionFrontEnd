import { Box } from "@mui/material";
import "./Spinner.css";

export default function Spinner() {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
            <div className="pokeball"></div>
        </Box>
    )
};