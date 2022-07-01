import * as yup from "yup";

export const animalSchema = yup.object().shape({
  idSenasa: yup
    .string()
    .max(16, "EL ID SENASA NO PUEDE SER MAYOR DE 16 CARACTERES")
    .required("EL ID SENASA ES OBLIGATORIO"),
  typeOfAnimal: yup.string().required("EL TIPO DE ANIMAL ES OBLIGATORIO"),
  animalWeight: yup.string(),
  pastureName: yup
    .string()
    .max(200, "EL NOMBRE DEL POTRERO ES DEMASIADO LARGO")
    .required("EL NOMBRE DEL POTRERO ES REQUERIDO"),
  deviceType: yup.string().required("EL TIPO DE DISPOSITIVO ES REQUERIDO"),
  deviceNumber: yup
    .string()
    .max(8, "EL NUMERO DEL DISPOSITIVO ES DEMASIADO LARGO")
    .required("EL NUMERO DEL DISPOSITIVO ES REQUERIDO"),
});

