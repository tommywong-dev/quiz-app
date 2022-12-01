import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React, { useMemo } from "react";
import { useTranslations } from "../../../hooks";
import { IUser } from "../../../interfaces";
import * as yup from "yup";

interface Props {
  onSubmit: (values: IUser) => void;
}

const initialValues: IUser = {
  name: "",
  email: "",
};

const UserForm = (props: Props) => {
  const { onSubmit } = props;
  const t = useTranslations();

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        name: yup
          .string()
          .min(2, t.form.name.tooShort)
          .max(50, t.form.name.tooLong)
          .required(t.form.name.required),
        email: yup
          .string()
          .min(4, t.form.email.tooShort)
          .max(50, t.form.email.tooLong)
          .required(t.form.email.required)
          .email(t.form.email.invalid),
      }),
    [t]
  );

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ errors, touched }) => (
        <Form noValidate>
          <Stack>
            <Field name="name">
              {({ field }: any) => (
                <FormControl
                  isRequired
                  isInvalid={Boolean(errors.name && touched.name)}
                >
                  <Input {...field} placeholder={t.form.name.title} required />
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="email">
              {({ field }: any) => (
                <FormControl
                  isRequired
                  isInvalid={Boolean(errors.email && touched.email)}
                >
                  <Input {...field} placeholder={t.form.email.title} required />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button width="full" type="submit" colorScheme="brand">
              {t.form.enter}
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;
