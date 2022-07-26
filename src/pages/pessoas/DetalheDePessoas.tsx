import { Form } from "@unform/web"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { FerramentasDeDetalhe } from "../../shared/components"
import { VTextField } from "../../shared/forms"
import { LayoutBaseDePagina } from "../../shared/layouts"
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService"


export const DetalheDePessoas: React.FC = () => {
  const { id = 'nova' } = useParams<'id'>()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true)
  const [nome, setNome] = useState("")

  useEffect(() => {
    if (id !== 'nova') {
      setIsLoading(true)
      PessoasService.getById(+id)
        .then((result) => {
          setIsLoading(false)

          if (result instanceof Error) {
            alert(result.message)
            navigate('/pessoas')
          } else {
            setNome(result.nomeCompleto)
            console.log(result)
          }
        })
    }
  }, [id])

  const handleDelete = (id: number) => {
    if (window.confirm("Realmente deseja apagar?")) {
      PessoasService.deleteById(id)
        .then(result => {
          if (result instanceof Error) {
            alert(result.message)
          } else {
            alert('Registro apagado com sucesso!')
            navigate('/pessoas')
          }
        })
    }
  }

  return (
    <LayoutBaseDePagina
      titulo={id === 'nova' ? 'Nova pessoa' : nome}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo="Nova"
          mostrarBotaoSalvarEFechar
          mostrarBotaoNovo={id !== 'nova'}
          mostrarBotaoApagar={id !== 'nova'}

          aoClicarEmSalvar={() => { }}
          aoClicarEmSalvarEFechar={() => { }}
          aoClicarEmApagar={() => { handleDelete(+id) }}
          aoClicarEmNovo={() => { navigate('/pessoas') }}
          aoClicarEmVoltar={() => { navigate('/pessoas/detalhe/nova') }}
        />
      }
    >

      <Form onSubmit={console.log}>
        <VTextField
          name="NomeCompleto"

        />
        <button type="submit">Submit</button>
      </Form>

    </LayoutBaseDePagina>
  )
}