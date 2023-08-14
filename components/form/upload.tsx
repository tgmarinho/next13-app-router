import { usePreview } from 'context/preview-product';
import { filesize } from 'filesize';
import { LucideUpload, X } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { Accept, DropzoneOptions, useDropzone } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

interface UploadProps {
  name: string;
  accept?: Accept;
}

interface IFile {
  id: string;
  name: string;
  size: string;
  uploaded?: boolean;
  preview?: string;
  file: File | null;
  progress?: number;
  error?: boolean;
  url: string;
  mainImage?: string;
}

const acceptDefault = { image: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'] };

export const Upload = ({ name, accept = acceptDefault }: UploadProps) => {
  const [mainImage, setMainImage] = useState('');
  const { product, setProduct } = usePreview();

  const { register, unregister, setValue, getValues, watch } = useFormContext();
  const files: IFile[] = watch(name);

  const handleMainImage = (id: string, file: any) => {
    files.forEach((file) => delete file.mainImage);
    const url = URL.createObjectURL(file);
    setProduct({ ...product, mainImage: url });

    file['mainImage'] = id;
    setMainImage(id);
  };

  const onDrop = useCallback<DropzoneOptions['onDrop']>(
    (droppedFiles) => {
      const filesAdded: IFile[] = getValues(name);

      if (filesAdded === undefined) {
        setValue(name, droppedFiles, { shouldValidate: true });
        return;
      }
      const filtered = droppedFiles.filter((image: any) => !filesAdded.includes(image));
      setValue(name, [...filesAdded, ...filtered], { shouldValidate: true });
    },
    [setValue, name, getValues]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept
  });

  function handleDeleteFile(_id: any) {
    const updatedFiles = files?.filter((file) => file.id !== _id);
    setValue(name, updatedFiles, { shouldValidate: true });
  }

  useEffect(() => {
    register(name);
    return () => {
      unregister(name);
    };
  }, [register, unregister, name]);

  useEffect(() => {
    if (files?.length) {
      const uploaded = files?.map((file) => {
        return {
          _id: file.id,
          file: file
        };
      });

      if (uploaded.length) {
        const firstId = uploaded[0]!._id;
        const firstFile = uploaded[0]!.file;
        const fileUrl = URL.createObjectURL(firstFile);
        setProduct({ ...product, mainImage: fileUrl });
        setMainImage(firstId);
        firstFile['mainImage'] = firstId;
      }
    }
  }, [files]);

  function messageError(isDragActive: boolean, isDragReject: boolean) {
    if (!isDragActive) {
      return (
        <div className="flex items-center gap-2 ">
          <LucideUpload color="#737373" size={20} />
          <p className="text-gray-500">Arraste ou clique para adcionar as imagens</p>
        </div>
      );
    }

    if (isDragReject) {
      return <p className="text-red-500">Arquivo não suportado</p>;
    }

    return <p className="text-green-500">Solte as imagens</p>;
  }

  return (
    <>
      <div
        {...getRootProps()}
        aria-label="File Upload"
        role="button"
        className={`flex h-20 w-full items-center justify-center rounded-md border-[3px] border-dashed border-gray-300 p-5
          text-center ${
            (isDragReject && 'border-red-600') || (isDragActive && 'border-green-500')
          }`}
      >
        <input name={name} {...getInputProps()} multiple />
        {messageError(isDragActive, isDragReject)}
      </div>

      <div className="my-6 mt-7 grid w-full  grid-cols-2 items-center gap-4  md:grid-cols-3 md:gap-2">
        {files?.map((file) => (
          <li
            key={(file['id'] = uuidv4())}
            className={`relative flex h-[10rem] w-full cursor-pointer rounded-md border-sizeFocus duration-300 hover:scale-[1.03] md:h-[15rem] ${
              mainImage === file.id && 'border-blue-600 shadow-lg'
            }`}
            onClick={() => handleMainImage(file.id, file)}
          >
            <button
              onClick={() => handleDeleteFile(file.id)}
              className="absolute right-[-8px] top-[-8px] cursor-pointer rounded-[50%] border border-transparent p-1 shadow-md backdrop-blur-md backdrop-sepia-0 duration-200 hover:bg-gray-300"
            >
              <X color="black" size={20} />
            </button>
            <Image
              width={100}
              height={100}
              src={URL.createObjectURL(file)}
              alt={file.name}
              className="h-full w-full object-cover"
            />
            <p className="absolute left-1 top-1 rounded-sm bg-gray-500 p-1 text-xs text-white">
              {filesize(file.size)}
            </p>
            {mainImage === file.id && (
              <div className="ms:text-base absolute bottom-1 left-0 right-0 m-auto flex  w-11/12 justify-center rounded-md border border-transparent bg-gray-800/20 px-1 py-1 text-xs backdrop-blur-md backdrop-sepia-0 duration-200 md:px-4">
                <p className="text-sm tracking-wider text-white">Imagem pricipal</p>
              </div>
            )}
          </li>
        ))}
      </div>
    </>
  );
};
