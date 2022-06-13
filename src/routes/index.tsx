import { Button } from "@mui/material";
import { Routes, Route, Link, Navigate } from "react-router-dom";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/pagina-inicial" element={<Button>Teste</Button>} />
            <Route path="*" element={<Navigate to="/pagina-inicial" />} />
        </Routes>
    )
}
