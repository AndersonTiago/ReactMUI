import { Autocomplete, CircularProgress, TextField } from "@mui/material"
import { useField } from "@unform/core";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "../../../shared/hooks";
import { CidadesService } from "../../../shared/services/api/cidades/CidadesService";

type TAutoCompleteOption = {
  id: number;
  label: string;
}

interface IAutoCompleteCidadadeProps {
  isExternalLoading?: boolean
}

export const AutoCompleteCidadade: React.FC<IAutoCompleteCidadadeProps> = ({ isExternalLoading = false }) => {
  const { fieldName, registerField, defaultValue, clearError, error } = useField('cidadeId')
  const { debounce } = useDebounce()

  const [selectedId, setSelectedId] = useState<number | undefined>(defaultValue)

  const [opcoes, setOpcoes] = useState<TAutoCompleteOption[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [busca, setBusca] = useState("")

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => selectedId,
      setValue: (_, newSelectedId) => setSelectedId(newSelectedId),
    })
  }, [registerField, fieldName, selectedId])

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      CidadesService.getAll(1, busca)
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            // alert(result.message);
          } else {
            console.log(result);
            setOpcoes(result.data.map(cidade => ({ id: cidade.id, label: cidade.nome })));
          }
        });
    });
  }, [busca]);

  const autoCompleteSelectedOption = useMemo(() => {
    if (!selectedId) return null;

    const selectedOption = opcoes.find(opcao => opcao.id === selectedId)

    return selectedOption

  }, [selectedId, opcoes])

  return (
    <Autocomplete
      openText="Abrir"
      closeText="Fechar"
      noOptionsText="Sem opções"
      loadingText="Carregando..."

      disablePortal

      value={autoCompleteSelectedOption}
      loading={isLoading}
      disabled={isExternalLoading}
      popupIcon={(isExternalLoading || isLoading) ? <CircularProgress size={28} /> : undefined}
      options={opcoes}
      onInputChange={(_, newValue) => setBusca(newValue)}
      onChange={(_, newValew) => { setSelectedId(newValew?.id); setBusca(''); clearError() }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Cidade"
          error={!!error}
          helperText={error}
        />
      )}
    />
  )
}