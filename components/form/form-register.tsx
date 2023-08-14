import { zodResolver } from '@hookform/resolvers/zod';
import { ButtonCustom } from 'components/button';
import Heading from 'components/heading';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { mask, unmask } from 'remask';
import { z } from 'zod';
import ErrorMessage from './error-message';
import TextFiled from './input';
import InputContainer from './input-container';
import { Label } from './label';

export const createUserSaleSchema = z.object({
  username: z.string().nonempty('Insira seu nome'),
  email: z
    .string()
    .nonempty('Insira um E-mail')
    .email({
      message: 'Insira um e-mail válido'
    })
    .toLowerCase(),
  cpfCnpj: z
    .string()
    .refine((value) => value.length === 11 || value.length === 14, 'Insira um CPF ou CNPJ válido')
    .refine((value) => value.length, 'Insira o número de CPF/CNPJ'),
  phone: z.string().nonempty('Insira um número para contato')
});

type FormData = z.infer<typeof createUserSaleSchema>;

export default function FormRegister() {
  const createUserForm = useForm<FormData>({ resolver: zodResolver(createUserSaleSchema) });

  const { handleSubmit, control, register } = createUserForm;

  const createUserSale = (data: FormData) => {
    console.log(data);
  };

  return (
    <FormProvider {...createUserForm}>
      <div className="flex flex-col items-center bg-white">
        <form onSubmit={handleSubmit(createUserSale)} className="w-full max-w-xl gap-2">
          <Heading size="medium" color="black" title="Registro" />

          <InputContainer>
            <div className="mb-4 flex w-10/12 flex-col items-start gap-1">
              <Label color="black" htmlFor="username">
                Nome
              </Label>
              <TextFiled color="white" name="username" placeholder="Ex: John Call" />
              <ErrorMessage field="username" />
            </div>

            <InputContainer>
              <Label color="black" htmlFor="cpf">
                Contato
              </Label>
              <Controller
                control={control}
                name="phone"
                render={({ field }) => (
                  <input
                    className="w-full rounded-md border-[3px] bg-gray-100 p-3 text-black shadow-sm outline-none placeholder:text-gray-300 focus:border-blue-600"
                    placeholder="(00) 0 0000-0000"
                    value={field.value || ''}
                    type="text"
                    {...register('phone')}
                    onChange={(e) => {
                      const origin = unmask(e.target.value);
                      const masked = mask(origin, '(99) 9 9999-9999');
                      field.onChange(masked);
                    }}
                  />
                )}
              />
              <ErrorMessage field="phone" />
            </InputContainer>
          </InputContainer>

          <InputContainer>
            <Label color="black" htmlFor="email">
              E-mail
            </Label>
            <TextFiled color="white" name="email" type="email" placeholder="Ex: john@email.com" />
            <ErrorMessage field="email" />
          </InputContainer>

          <InputContainer>
            <Label color="black" htmlFor="cpf">
              CPF/CNPJ
            </Label>
            <Controller
              control={control}
              name="cpfCnpj"
              render={({ field }) => (
                <input
                  className="w-full rounded-md border-[3px] bg-gray-100 p-3 text-black shadow-sm outline-none placeholder:text-gray-300 focus:border-blue-600"
                  value={field.value || ''}
                  placeholder="000.000.000-00"
                  type="text"
                  {...register('cpfCnpj')}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const origin = unmask(e.target.value);
                    const masked = mask(origin, ['999.999.999-99', '99.999.999/9999-99']);
                    field.onChange(masked);
                  }}
                />
              )}
            />
            <ErrorMessage field="cpfCnpj" />
          </InputContainer>

          <div className="my-8">
            <p className="text-center text-black">
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

          <ButtonCustom isFull type="submit">
            Continuar
          </ButtonCustom>
        </form>
      </div>
    </FormProvider>
  );
}
