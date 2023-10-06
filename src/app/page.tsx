"use client";
import { useForm } from "react-hook-form";
import * as S from "./styles";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const Home = () => {

  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'all',
    criteriaMode: 'all'
  })

  const handleSubmitData = (data: any) => {
    console.log(data)
  }

  console.log(errors)

  return (
    <S.Container>
      <S.Form action="" onSubmit={handleSubmit(handleSubmitData)}>
        <label htmlFor="">Nome</label>
        <input type="text" {...register('name')}/>

        <label htmlFor="">Email</label>
        <input type="email" {...register('email')}/>

        <label htmlFor="">Senha</label>
        <input type="password" {...register('password')}/>

        <button>Salvar</button>
      </S.Form>
    </S.Container>
  );
};

export default Home;

// 1 - criar formulário (inputs, labels e button)
// 2 - criar useForm, importar o register, handleSubmit e formState: {errors} e colocar mode: 'all' dentro do useForm, e criar funçao handleSubmitData (data: any) e dar um console.log na data
// 3 - colocar {...register('nome do campo')} nos inputs
// 4 - testar se tá indo no console.log quando envia qq coisa
// 5 - criar schema com os mesmos nomes dos inputs e criar validações que quiser
// 6 - criar type FormProps e inferir (z.infer<>) do mesmo tipo do schema: z.infer<typeof schema>
// 7 - passar o type FormProps para o useState e a data no handleSubmitData
// 8 - colocar "resolver": zodResolver(schema) para começar a funcionar as validações do schema
// 9 - dar console.log(errors) para ver os erros
// 10 - exibir os erros abaixo dos inputs com um span: {errors.nomedocampo && <span>{errors.nomedocampo.message}</span>}
