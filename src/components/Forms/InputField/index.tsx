// import {
//   FieldValues,
//   UseFormRegister,
//   FieldError,
//   Path,
// } from "react-hook-form";

// interface InputProps<T extends FieldValues> {
//   label: string;
//   type: string;
//   placeholder: string;
//   register: UseFormRegister<T>;
//   name: Path<T>; // Use Path<T> here
//   errors: { [key in Path<T>]?: FieldError }; // Adjust the error type
//   min?: number;
//   max?: number;
// }

// export const InputField = <T extends FieldValues>({
//   label,
//   type,
//   placeholder,
//   register,
//   name,
//   errors,
//   min,
//   max,
// }: InputProps<T>) => {
//   return (
//     <div className="mb-4">
//       <label className="block text-sm font-medium">{label}</label>
//       <input
//         type={type}
//         {...register(name, { valueAsNumber: true })}
//         className="w-full p-3 border border-gray-300 rounded-md"
//         placeholder={placeholder}
//         min={min}
//         max={max}
//       />
//       <p className="text-danger text-xs">{errors[name]?.message}</p>
//     </div>
//   );
// };
