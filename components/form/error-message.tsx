import { useFormContext } from 'react-hook-form';

type ErrorMessageProps = {
  field: string;
  position?: boolean;
};

function get(obj: Record<any, any>, path: string) {
  const travel = (regexp: RegExp) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj);

  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);

  return result;
}

export default function ErrorMessage({ field, position }: ErrorMessageProps) {
  const {
    formState: { errors }
  } = useFormContext();

  const fieldError = get(errors, field);

  if (!fieldError) {
    return null;
  }

  return (
    <p className={`pl-1 text-xs font-semibold text-red-500 ${position && 'absolute bottom-0'}`}>
      {fieldError.message.toString()}
    </p>
  );
}
