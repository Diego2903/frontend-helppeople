import { Route, Routes } from "react-router-dom"
import { Ciudadanos } from "../components/Ciudadanos"
import { Vacantes } from "../components/Vacantes"


export const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Vacantes />} />
                <Route path="/ciudadanos" element={<Ciudadanos />} />
                <Route path="/*" element={<Vacantes />} />
            </Routes>

        </>
    )
}
