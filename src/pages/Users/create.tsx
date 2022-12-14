import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header/indexHeader";
import { Sidebar } from "../../components/Sidebar/indexSidebar";
import { useMutation } from "react-query";
import { api } from "../../services/api";

import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';


type CreateUserFormData = {
    name:string;
    email: string;
    password: string;
    password_confirmation: string;
  
  }
  
  
const CreateUserFormSchema = yup.object().shape({
    name: yup.string().required('Nome obrigatório'),
    email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
    password: yup.string().required('Senha obrigatória').min(6, 'No mínimo 6 caracteres'),
    password_confirmation: yup.string().oneOf([null, yup.ref('password')], 'As senhas precisam ser iguais')

  })


export default function UserCreate() {

    const {mutateAsync} = useMutation(async (user: CreateUserFormData) => {

      const response = await api.post('users', {
        user: {
            ...user,
            created_at: new Date(),
        }
      })

        return response.data.user;
    }_)

    const {register, handleSubmit, formState} = useForm({resolver: yupResolver(CreateUserFormSchema)})

    const{errors} = formState
    const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
        await new Promise((resolve) => setTimeout(resolve, 2000))
        console.log(values)

}

    return (
        <Box>
            <Header />
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="4">
                <Sidebar />
                <Box as="form" flex="1" borderRadius={8} bg="gray.800" p={["6","8"]} onSubmit={handleSubmit(handleCreateUser)}>
                    <Heading size="large" fontWeight="normal">Criar usuário</Heading>
                    <Divider my="6" borderColor="gray.700"></Divider>
                    <VStack spacing="8">
                        <SimpleGrid minChildWidth="240px" spacing={["6","8"]} w="100%">
                            <Input name="nome" label="Nome completo" {...register('name')} error={errors.name}></Input>
                            <Input name="email" type="email" label="E-mail" {...register('email')} error={errors.email}></Input>
                        </SimpleGrid>
                        <SimpleGrid minChildWidth="240px" spacing={["6","8"]} w="100%">
                            <Input name="password" type="password" label="Senha" {...register('password')} error={errors.password}></Input>
                            <Input name="password_confirmation" type="password" label="Confirmar senha" {...register('password_confirmation')} error={errors.password_confirmation}></Input>
                        </SimpleGrid>

                    </VStack>
                    <Flex mt="8" justify="flex-end">
                        <HStack spacing="4">
                                <Link href="/Users"><Button as="a" colorScheme="whiteAlpha">Cancelar</Button></Link>
                                <Button type="submit" colorScheme="green" isLoading={formState.isSubmitting}>Salvar</Button>
                        </HStack>


                    </Flex>

                </Box>

            </Flex>

        </Box>
    );
}