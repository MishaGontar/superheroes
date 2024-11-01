import * as yup from "yup";

export const validationSchema = yup.object({
    nickname: yup.string().required('Required').max(50),
    realName: yup.string().required('Required').max(50),
    originDescription: yup.string().required('Required'),
    catchPhrase: yup.string().required('Required').max(255),
    superpowers: yup.string().required('Required'),
});