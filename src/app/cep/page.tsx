"use client";
import { useForm, useFieldArray } from "react-hook-form";
import * as S from "../styles";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useCallback, useEffect } from "react";

const schemaCep = z.object({
  address: z.object({
    cep: z.string().min(8, "o cep deve conter 8 dígitos"),
    rua: z.string().nonempty("Este campo é obrigatório"),
    numero: z.string().nonempty("Este campo é obrigatório"),
    complemento: z.string(),
    bairro: z.string().nonempty("Este campo é obrigatório"),
    cidade: z.string().nonempty("Este campo é obrigatório"),
    estado: z.string().nonempty("Este campo é obrigatório"),
  }),
}).transform((field) => ({
    address: {
        cep: field.address.cep,
        rua: field.address.rua,
        numero: field.address.numero,
        complemento: field.address.complemento,
        bairro: field.address.bairro,
        cidade: field.address.cidade,
        estado: field.address.estado,
    }
}))

type FormProps = z.infer<typeof schemaCep>;
type AddressProps = {
    bairro: string,
    complemento: string,
    localidade: string,
    logradouro: string,
    uf: string
}

const FormCep = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<FormProps>({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(schemaCep),
    defaultValues: {
      address: {
        cep: "",
        rua: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        estado: "",
      },
    },
  });

  const handleSubmitData = (data: FormProps) => {
    console.log(data.address);
  };

  const cep = watch('address.cep')
  
  const handleSetData = useCallback((data: AddressProps) => {
    setValue('address.bairro', data.bairro)
    setValue('address.cidade', data.localidade)
    setValue('address.estado', data.uf)
    setValue('address.rua', data.logradouro)
    setValue('address.complemento', data.complemento)
  }, [setValue])

  const handleFetchAddress = useCallback(async (cep: string) => {
    const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

    handleSetData(data)
  },[handleSetData])


  useEffect(() => {
    setValue('address.cep', cep)

    if (cep.length !== 8) return

    handleFetchAddress(cep)
  }, [handleFetchAddress, cep, setValue]);

  return (
    <S.Container>
      <S.Form onSubmit={handleSubmit(handleSubmitData)}>
        <h1>Busca de cep</h1>

        <S.Input type="text" {...register("address.cep")} placeholder="CEP" />
        {errors.address?.cep && <span>{errors.address.cep.message}</span>}

        <S.Input type="text" {...register("address.rua")} placeholder="Rua" />
        {errors.address?.rua && <span>{errors.address.rua.message}</span>}

        <S.Input
          type="text"
          {...register("address.numero")}
          placeholder="Número"
        />
        {errors.address?.numero && <span>{errors.address.numero.message}</span>}

        <S.Input
          type="text"
          {...register("address.complemento")}
          placeholder="Complemento"
        />
        {errors.address?.complemento && (
          <span>{errors.address.complemento.message}</span>
        )}

        <S.Input
          type="text"
          {...register("address.bairro")}
          placeholder="Bairro"
        />
        {errors.address?.bairro && <span>{errors.address.bairro.message}</span>}

        <S.Input
          type="text"
          {...register("address.cidade")}
          placeholder="Cidade"
        />
        {errors.address?.cidade && <span>{errors.address.cidade.message}</span>}

        <S.Input
          type="text"
          {...register("address.estado")}
          placeholder="Estado"
        />
        {errors.address?.estado && <span>{errors.address.estado.message}</span>}

        <S.Button>Buscar</S.Button>
      </S.Form>
    </S.Container>
  );
};

export default FormCep;
