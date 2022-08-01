import { Button, Stack, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "../../styles/Home.module.css";

const schema = yup
  .object({
    name: yup.string().required("Please enter your name"),
    age: yup
      .number()
      .typeError("Invalid age")
      .positive("Invalid age")
      .integer("Invalid age")
      .required("Please enter your age"),
    address: yup
      .string()
      .matches(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address")
      .required("Please enter your Ethereum address"),
  })
  .required();

interface GreetingFormFieldValues {
  name: string;
  age: number;
  address: string;
}

export default function ExampleForm() {
  const {
    handleSubmit: bindHandleSubmit,
    register,
    formState: { errors },
  } = useForm<GreetingFormFieldValues>({
    resolver: yupResolver(schema),
  });

  const handleSubmit = bindHandleSubmit((fieldValues) => {
    console.log(fieldValues);
  });

  const bindInput = (name: keyof GreetingFormFieldValues) => ({
    ...register(name),
    error: !!errors[name],
    helperText: errors[name]?.message ?? <br />,
  });

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Example Form</h1>

        <p className={styles.description}>An example form with validation</p>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2} width={500}>
            <TextField label="Name" {...bindInput("name")} />
            <TextField label="Age" {...bindInput("age")} type="number" />
            <TextField label="Address" {...bindInput("address")} />
            <Button type="submit">Submit</Button>
          </Stack>
        </form>
      </main>
    </div>
  );
}
