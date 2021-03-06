import { ReactNode } from "react";
import { Icon, IconButton, Theme, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/system"
import { useDrawerContext } from "../contexts";

interface ILayoutBaseDePagina {
    children?: React.ReactNode;
    titulo: String;
    barraDeFerramentas?: ReactNode;
}

export const LayoutBaseDePagina: React.FC<ILayoutBaseDePagina> = ({ children, titulo, barraDeFerramentas }) => {
    const theme = useTheme()
    const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm')) // verificando se a tela é pequena
    const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md')) // verificando se a tela é pequena
    const { toggleDrawerOpen } = useDrawerContext()
    return (
        <Box height="100%" display="flex" flexDirection="column" gap={1}>
            <Box padding={1} height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)} display="flex" alignItems="center" gap={1}>
                {smDown && (
                    <IconButton onClick={toggleDrawerOpen}>
                        <Icon>menu</Icon>
                    </IconButton>
                )}

                <Typography
                    overflow="hidden"
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                    variant={smDown ? 'h5' : mdDown ? 'h4' : 'h3'}
                >
                    {titulo}
                </Typography>
            </Box>

            {barraDeFerramentas && (
                <Box>
                    {barraDeFerramentas}
                </Box>
            )}

            <Box flex={1} overflow="auto">
                {children}
            </Box>
        </Box>
    )
}