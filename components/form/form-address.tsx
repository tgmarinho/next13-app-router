import { zodResolver } from '@hookform/resolvers/zod';
import { ButtonCustom } from 'components/button';
import Heading from 'components/heading';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import ErrorMessage from './error-message';
import TextFiled from './input';
import InputContainer from './input-container';
import InputMaskCustom from './input-mask';
import { Label } from './label';

type FormAddressProps = {
  firstTitle: string
  secondTitle: string
}

const createUserSchema = z.object({
  username: z.string().nonempty('Insira seu nome de cadastro'),
  email: z.string().email('Preencha um e-mail válido'),
  cep: z.string().nonempty('Campo obrigatório').min(8, 'Digite um CEP válido'),
  rua: z.string().nonempty('Campo obrigatório'),
  numero: z.string().nonempty('Campo obrigatório'),
  bairro: z.string().nonempty('Campo obrigatório'),
  complemento: z.string(),
  localidade: z.string().nonempty('Campo obrigatório'),
  uf: z
    .string()
    .nonempty('Campo obrigatório')
    .refine((value) => value.toLowerCase)
});

type FormData = z.infer<typeof createUserSchema>;

const BASE_CEP_API = 'https://viacep.com.br/ws/';

export default function FormAddress({firstTitle, secondTitle}:FormAddressProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false);

  const createForm = useForm<FormData>({ resolver: zodResolver(createUserSchema) });
  const { handleSubmit, setValue, control } = createForm;

  const createRegisterAddress = (data: FormData) => {
    console.log(data);
    router.push("/pagamento/entrega")
  };

  return (
    <FormProvider {...createForm}>
      <form onSubmit={handleSubmit(createRegisterAddress)} className="flex w-full flex-col">
        <Heading size="medium" color="white" title={firstTitle} />

        <InputContainer>
          <Label color="white" htmlFor="username">
            Nome
          </Label>
          <TextFiled color='black' name="username" />
          <ErrorMessage field="username" />
        </InputContainer>

        <InputContainer>
          <Label color="white" htmlFor="email">
            E-mail
          </Label>
          <TextFiled color='black' name="email" type="email" />
          <ErrorMessage field="email" />
        </InputContainer>

      <div className='mt-4'>
        <Heading color='white' size='medium' title={secondTitle}/>
      </div>

        <div className="flex gap-1 flex-row">
          <InputContainer >
            <Label color="white" htmlFor="cep">
              CEP
            </Label>
            <Controller
              control={control}
              name="cep"
              render={({ field }) => (
                <InputMaskCustom
                  {...field}
                  color="black"
                
                  name="cep"
                  type="text"
                  mask="99999-999"
                  value={field.value || ''}
                  onChange={async (e) => {
                    const input = e.target.value.replace(/[^0-9]/g, '');
                    console.log({ input });
                    const isValid = input.length === 8;
                    field.onChange(input);
                    if (isValid) {
                      setLoading(true);
                      try {
                        const response = await fetch(`${BASE_CEP_API}/${input}/json/`);
                        const { logradouro, complemento, bairro, localidade, uf } =
                          await response.json();
                        setValue('rua', logradouro);
                        setValue('bairro', bairro);
                        setValue('complemento', complemento);
                        setValue('localidade', localidade);
                        setValue('uf', uf);
                        setLoading(false);
                      } catch (error) {
                        console.log(error);
                      }
                    }
                  }}
                />
              )}
            />
            {loading ? (
              <p className="ml-2 animate-pulse text-sm text-gray-400">Buscando CEP...</p>
            ) : (
              <ErrorMessage field="cep" />
            )}
          </InputContainer>

          <InputContainer>
            <Label color="white" htmlFor="bairro">
              Bairro
            </Label>
            <Controller
              control={control}
              name="bairro"
              render={({ field }) => <TextFiled color='black' {...field} name="bairro" type="text" />}
            />
            <ErrorMessage field="bairro" />
          </InputContainer>
        </div>

        <InputContainer >
            <Label color="white" htmlFor="rua">
              Rua
            </Label>
            <Controller
              control={control}
              name="rua"
              render={({ field }) => <TextFiled color='black' {...field} name="rua" type="text" />}
            />
            <ErrorMessage field="rua" />
          </InputContainer>

        <div className="relative  flex w-full gap-1 flex-row">
          <InputContainer>
            <Label color="white" htmlFor="complemento">
              Complemento
            </Label>
            <Controller
              control={control}
              name="complemento"
              render={({ field }) => (
                <TextFiled color='black' {...field} name="complemento" type="text" />
              )}
            />
            <ErrorMessage field="complemento" />
          </InputContainer>

          <div className='md:w-1/5 w-1/4'>
          <InputContainer>
            <Label color="white" htmlFor="numero">
              Nº
            </Label>
            <TextFiled color='black' name="numero" type="text" />
            <div className="bottom-4 right-0 md:absolute">
              <ErrorMessage field="numero" />
            </div>
          </InputContainer>
</div>
          
        </div>

        <div className=" flex items-start gap-1 flex-row">
          <InputContainer >
            <Label color="white" htmlFor="localidade">
              Localidade
            </Label>
            <Controller
              control={control}
              name="localidade"
              render={({ field }) => (
                <TextFiled color='black' {...field} name="localidade" type="text" />
              )}
            />
            <ErrorMessage field="localidade" />
          </InputContainer>

          <div className='md:w-1/5 w-1/4'>
          <InputContainer >
            <Label color="white" htmlFor='uf'>UF</Label>
            <Controller
              control={control}
              name="uf"
              render={({ field }) => <TextFiled color='black' {...field} name="uf" type="text"
              />
            }
            />
            <ErrorMessage field="uf" />
          </InputContainer>
          </div>
        </div>

        <div className="my-8">
          <p className="text-center text-white tracking-wider">
            Ao clicar em <strong>CONTINUAR</strong> você concorda com os{' '}
            <a href="/termos-de-uso" className="cursor-pointer text-blue-600 hover:underline ">
              Termos de Uso
            </a>{' '}
            e{' '}
            <a
              href="/politica-de-privacidade"
              className="cursor-pointer text-blue-600 hover:underline"
            >
              Política de Privacidade
            </a>{' '}
            de nossa plataforma.
          </p>
        </div>

        <ButtonCustom type="submit">
          Continuar
        </ButtonCustom>
      </form>
    </FormProvider>
  );
}
