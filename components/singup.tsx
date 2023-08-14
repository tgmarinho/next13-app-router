import { zodResolver } from '@hookform/resolvers/zod';
import { ButtonCustom } from 'components/button';
import ErrorMessage from 'components/form/error-message';
import TextFiled from 'components/form/input';
import { Label } from 'components/form/label';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import FormContainer from './form-container';
import Heading from './heading';

export const createUserSchema = z.object({
  name: z
    .string()
    .nonempty('Digite seu nome completo')
    .refine((value) => value.split(' ').length === 2, 'Digite seu sobrenome'),
  email: z
    .string()
    .nonempty('Digite seu e-mail')
    .email({
      message: 'Digite um e-mail válido'
    })
    .toLowerCase(),
  wallet: z
    .string()
    .nonempty('Conecte-se na carteira digital')
    // TODO use web3 (ethers) to validate the wallet
    .refine((value) => value.length >= 1, 'A carteira precisa ter no mínimo 42 caracteres')
});

type FormData = z.infer<typeof createUserSchema>;

export default function SignUp() {



  const createUserForm = useForm<FormData>({ resolver: zodResolver(createUserSchema) });

  const { handleSubmit, setValue } = createUserForm;


  useEffect(() => {
    setValue('wallet', "blabla")
  }, [])


  const createNewUser = async (data: FormData) => {
    try {
      console.log(data);
    const fakeData = {
      type: 'PF',
      cpf: '00012345698',
      ...data
    }
    console.log({fakeData})
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Indica que estamos enviando JSON
      },
      body: JSON.stringify(fakeData), // Converte os dados para JSON
    };
    const response = await fetch('http://localhost:3000/cadastrar/api/', requestOptions)
    const datat = await response.json()
    console.log({datat})
    } catch (error) {
      console.log({error})

    }
    // se sucesso redireciona usuário pra home com a conta logada
  };

  return (
    <FormContainer heading={<Heading size="small" color="white" title="Criar Conta" />}>
      <FormProvider {...createUserForm}>
        <form onSubmit={handleSubmit(createNewUser)} className="flex flex-col justify-center gap-2">
          <div className="mb-4 mt-6 flex w-full flex-col gap-1">
            <Label color="white" htmlFor="name">
              Nome
            </Label>
            <TextFiled id="name" name="name" value="Thiago Marinho"/>
            <ErrorMessage field="name" />
          </div>

          <div className="mb-4 flex w-full flex-col gap-1">
            <Label color="white" htmlFor="email">
              E-mail
            </Label>
            <TextFiled id="email" name="email" value="tgmarinho@gmail.com"/>
            <ErrorMessage field="email" />
          </div>

          <div className="mb-4 flex w-full flex-col gap-1" >
            <Label color="white" htmlFor="wallet">
              Endereço Carteira
            </Label>
            <TextFiled id="wallet" name="wallet" disabled={false} />
            <ErrorMessage field="wallet" />
          </div>

        
          <ButtonCustom type="submit">Criar conta</ButtonCustom>
        </form>
      </FormProvider>
    </FormContainer>
  );
}
