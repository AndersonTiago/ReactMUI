import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard, ListagemDePessoas } from '../pages';
import { useDrawerContext } from '../shared/contexts';

export const AppRoutes = () => {
    const { toggleDrawerOpen, setDrawerOptions } = useDrawerContext()

    useEffect(() => {
        setDrawerOptions([
            {
                icon: 'home',
                label: 'Página inicial',
                path: 'Página inicial'
            },
            {
                icon: 'people',
                label: 'Pessoas',
                path: '/pessoas'
            },
            // {
            //     icon: 'location_city',
            //     label: 'Cidades',
            //     path: '/cidades'
            // },

        ])
    }, [])

    return (
        <Routes>
            <Route path="/pagina-inicial" element={<Dashboard />} />

            <Route path="/pessoas" element={<ListagemDePessoas />} />
            {/* <Route path="/pessoas/detalhe/:id" element={<Dashboard />} /> */}


            <Route path="*" element={<Navigate to="/pagina-inicial" />} />
        </Routes>
    );
};



