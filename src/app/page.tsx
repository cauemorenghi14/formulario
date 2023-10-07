"use client";
import { useForm, useFieldArray } from "react-hook-form";
import * as S from "./styles";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schemaForm = z.object({
  name: z.string().nonempty('o campo "nome" é obrigatório').toUpperCase(),
  email: z.string().nonempty('o campo "email" é obirgatório').email('formato de email inválido').toLowerCase().refine(email => {
    return email.endsWith('gmail.com')
  }, 'o email deve terminar com "gmail.com".'),
  password: z.string().nonempty('o campo "senha" é obrigatório').min(6, 'a senha deve conter no mínimo 6 caracteres'),
})

type FormProps = z.infer<typeof schemaForm>

const Home = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<FormProps>({
    mode: 'all',
    criteriaMode: 'all',
    resolver: zodResolver(schemaForm),
    defaultValues: {
      email: '',
      name: '',
      password: ''
    }
  })

  const handleSubmitData = (data: FormProps) => {
    console.log(data)
  }

  console.log(errors)

  return (
    <S.Container>
      <S.Form action="" onSubmit={handleSubmit(handleSubmitData)}>
        <label htmlFor="">Nome</label>
        <input type="text" {...register('name')}/>
        {errors.name && <span>{errors.name.message}</span>}

        <label htmlFor="">Email</label>
        <input type="email" {...register('email')}/>
        {errors.email && <span>{errors.email.message}</span>}

        <label htmlFor="">Senha</label>
        <input type="password" {...register('password')}/>
        {errors.password && <span>{errors.password.message}</span>}

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
