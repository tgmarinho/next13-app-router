import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { ref, uploadBytes } from '@firebase/storage';
import { ButtonCustom } from 'components/button';
import Heading from 'components/heading';
import { storage } from 'config/firebase';
import { usePreview } from 'context/preview-product';
import { insertProduct } from 'lib/graphql/functions';
import { mask, unmask } from 'remask';
import ErrorMessage from './error-message';
import TextFiled from './input';
import InputContainer from './input-container';
import { Label } from './label';
import { Upload } from './upload';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5mb
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const schemaCreateAt = z.object({
  files: z
    .any()
    .refine((file) => !!file?.length, 'Adcione pelo menos uma imagem.')
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type),
      'Arquivos aceitos: .jpg, .jpeg, .png e .webp'
    )
    .refine((file) => file?.[0]?.size <= MAX_FILE_SIZE, `Imagem deve ter no máximo 5MB.`),
  name: z
    .string()
    .nonempty('Campo obrigatório')
    .transform((name) =>
      name
        .trim()
        .split(' ')
        .map((word) => word[0]?.toLocaleUpperCase().concat(word.substring(1)))
        .join()
    ),
  description: z
    .string()
    .nonempty('Campo obrigatório')
    .min(10, 'Descrição precisa ter no mínimo 10 caracteres'),
  price: z.string().nonempty('Campo obrigatório')
});

type FormData = z.infer<typeof schemaCreateAt>;

export default function FormProduct() {
  const { product, setProduct } = usePreview();

  const createProductForm = useForm<FormData>({ resolver: zodResolver(schemaCreateAt) });

  const { handleSubmit, control, register, reset } = createProductForm;

  const createAd = (data: FormData) => {
    const images = data.files.map((element: { path: any }) => {
      return element.path;
    });
    handleUpload(data.files);
    createProduct(1, parseInt(data.price), data.description, images, '', data.name);
    reset();
  };

  const createProduct = (
    user_id: number,
    price: number,
    description: String,
    images: [String],
    main_image: String,
    name: String
  ) => {
    insertProduct(user_id, price, description, images, main_image, name);
  };

  const handleUpload = (files: any[]) => {
    const uploadPromises = files.map((file) => {
      const storageRef = ref(storage, file.path);

      return uploadBytes(storageRef, file);
    });

    Promise.all(uploadPromises)
      .then(() => console.log('uploaded'))
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <FormProvider {...createProductForm}>
      <div className="flex w-full flex-col">
        <Heading size="medium" color="white" title="Anunciar Produto" />
        <form onSubmit={handleSubmit(createAd)} className="mt-6 w-full ">
          <InputContainer>
            <Label color="white" htmlFor="name">
              Nome
            </Label>
            <TextFiled
              color="black"
              name="name"
              placeholder="Ex: Laptop TechMax Pro"
              onChange={(e: any) => setProduct({ ...product, name: e.target.value })}
            />
            <ErrorMessage field="name" />
          </InputContainer>

          <InputContainer>
            <Label color="white" htmlFor="description">
              Descrição
            </Label>
            <TextFiled
              color="black"
              name="description"
              placeholder="Ex: Potência, estilo e desempenho em um só dispositivo. Processador avançado, tela de alta definição, armazenamento rápido, bateria de longa duração e recursos premium."
              isTextArea
            />
            <ErrorMessage field="description" />
          </InputContainer>

          <InputContainer>
            <Label color="white" htmlFor="price">
              Preço
            </Label>
            <Controller
              control={control}
              name="price"
              render={({ field }) => (
                <input
                  className="w-full rounded-md border-transparent bg-gray-900 p-3 text-lg tracking-widest text-white shadow-md outline-none placeholder:font-normal placeholder:text-gray-500 focus:border-blue-600"
                  type="text"
                  value={field.value || ''}
                  {...register('price')}
                  placeholder="Ex: 0,00456 BTC"
                  onChange={(e: any) => {
                    setProduct({ ...product, price: e.target.value });
                    const origin = unmask(e.target.value);
                    const masked = mask(origin, '9,99999');
                    field.onChange(masked);
                  }}
                />
              )}
            />
            <ErrorMessage field="price" />
          </InputContainer>

          <InputContainer>
            <Label color="white" htmlFor="files">
              Imagens
            </Label>
            <Upload name="files" />
            <ErrorMessage position field="files" />
          </InputContainer>

          <ButtonCustom type="submit" isFull>
            Publicar
          </ButtonCustom>
        </form>
      </div>
    </FormProvider>
  );
}
