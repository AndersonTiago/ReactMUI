import { Box, Card, CardContent, debounce, Grid, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { FerramentasDaListagem } from "../../shared/components"
import { LayoutBaseDePagina } from "../../shared/layouts"
import { CidadesService } from "../../shared/services/api/cidades/CidadesService";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";


export const Dashboard = () => {
    const [isLoadingCidades, setIsLoadingCidades] = useState(true);
    const [totalContCidades, setTotalCountCidades] = useState(0);
    const [isLoadingPessoas, setIsLoadingPessoas] = useState(true);
    const [totalContPessoas, setTotalCountPessoas] = useState(0);

    useEffect(() => {
        setIsLoadingCidades(true);
        setIsLoadingPessoas(true);

        CidadesService.getAll(1)
            .then((result) => {
                setIsLoadingCidades(false);

                if (result instanceof Error) {
                    alert(result.message);
                } else {
                    setTotalCountCidades(result.totalCount);
                }
            });
        PessoasService.getAll(1)
            .then((result) => {
                setIsLoadingPessoas(false);

                if (result instanceof Error) {
                    alert(result.message);
                } else {
                    setTotalCountPessoas(result.totalCount);
                }
            });
    }, []);


    return (
        <LayoutBaseDePagina
            titulo="Página Inicial"
            barraDeFerramentas={(
                <FerramentasDaListagem mostrarBotaoNovo={false} />
            )}>
            <Box width='100%' display='flex'>
                <Grid container margin={2}>
                    <Grid item container spacing={2}>

                        <Grid item xs={12} sm={12} md={8} lg={4} xl={3}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" align="center">
                                        Total de Cidades
                                    </Typography>

                                    <Box padding={6} display='flex' justifyContent="center" alignItems='center'>

                                        {!isLoadingPessoas && (<Typography variant="h1">
                                            {totalContPessoas}
                                        </Typography>)}

                                        {isLoadingPessoas && (
                                            <Typography variant="h6">
                                                Carregando...
                                            </Typography>
                                        )}

                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} sm={12} md={8} lg={4} xl={3}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" align="center">
                                        Total de Pessoas
                                    </Typography>

                                    <Box padding={6} display='flex' justifyContent="center" alignItems='center'>

                                        {!isLoadingCidades && (<Typography variant="h1">
                                            {totalContCidades}
                                        </Typography>)}

                                        {isLoadingCidades && (
                                            <Typography variant="h6">
                                                Carregando...
                                            </Typography>
                                        )}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>

                    </Grid>
                </Grid>
            </Box>
        </LayoutBaseDePagina>
    )
}