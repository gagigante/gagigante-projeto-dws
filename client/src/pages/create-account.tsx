import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Flex, Button, Stack } from '@chakra-ui/react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { Input } from '../components/Form/Input'
import { api } from '../services/api';

type SignInFormData = {
  name: string;
  email: string;
  password: string;
};

const signInFormSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória'),
})

const CreateAccount: NextPage = () => {
  const { push } = useRouter()
  const { register, handleSubmit, formState } = useForm<SignInFormData>({
    resolver: yupResolver(signInFormSchema)
  })

  const { errors } = formState

  const handleSignIn: SubmitHandler<SignInFormData> = async (data) => {
    try {
      await api.post('/usuarios', data);
      
      push('/');
    } catch {
      alert('Houve um erro ao criar usuário');
    }
  }

  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
    >
      <Flex
       as="form"
       w="100%"
       maxWidth={360}
       bg="gray.800"
       p="8"
       borderRadius={8}
       flexDir="column"
       onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Input type="text" label="Nome" error={errors.name} {...register('name')}/>

          <Input type="email" label="E-mail" error={errors.email} {...register('email')}/>

          <Input type="password" label="Senha" error={errors.password} {...register('password')}/>
        </Stack>

        <Button 
          type="submit"
          mt="6"
          colorScheme="pink"
          size="lg"
          isLoading={formState.isSubmitting}
        >Criar conta</Button>
      </Flex>
    </Flex>
  )
}

export default CreateAccount
