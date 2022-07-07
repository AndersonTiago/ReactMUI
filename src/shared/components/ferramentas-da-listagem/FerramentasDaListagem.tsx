import { Box, Paper, Button, TextField, useTheme, Icon } from "@mui/material"

interface IFerramentasDaListagemProps {
    children?: React.ReactNode;
    textoDaBusca?: String;
    mostrarInputBusca?: boolean;
    aoMudarTextoDeBusca?: (novoTexto: string) => void;
    textoBotaoNovo?: String;
    mostrarBotaoNovo?: boolean;
    aoClicarNovo?: () => void;
}

export const FerramentasDaListagem: React.FC<IFerramentasDaListagemProps> = ({
    textoDaBusca = '',
    mostrarInputBusca = false,
    aoMudarTextoDeBusca,
    textoBotaoNovo = "Novo",
    mostrarBotaoNovo = true,
    aoClicarNovo
}) => {
    const theme = useTheme()
    return (
        <Box
            gap={1}
            marginX={1}
            padding={1}
            paddingX={2}
            display="flex"
            alignItems="center"
            height={theme.spacing(5)}
            component={Paper}
        >

            {mostrarInputBusca && (
                <TextField
                    size="small"
                    value={textoDaBusca}
                    onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)}
                    placeholder="Pesquisar..."
                />
            )}

            <Box flex={1} display="flex" justifyContent="end">
                {mostrarBotaoNovo && (
                    <Button
                        color="primary"
                        disableElevation
                        variant="contained"
                        onClick={aoClicarNovo}
                        endIcon={<Icon>add</Icon>}
                    >
                        {textoBotaoNovo}
                    </Button>
                )}
            </Box>
        </Box>
    )
}