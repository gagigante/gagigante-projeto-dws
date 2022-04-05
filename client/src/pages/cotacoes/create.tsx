import { useState } from 'react'
import { Box, Button, Divider, Flex, Heading, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, useDisclosure, VStack } from '@chakra-ui/react'
import Link from 'next/link'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import { Input } from '../../components/Form/Input'
import { Header } from '../../components/Header'
import { Sidebar } from '../../components/Sidebar'
import { Cotacao } from '../../models/Cotacao';
import { api } from '../../services/api'
import { useAuth } from '../../contexts/AuthContext'

type CreateCotacaoFormData = {
  productName: string;
  productPrice: string;
  paymentType: 'mensal' | 'trimestral' | 'anual';
};

const createCotacaoFormSchema = yup.object({
  productName: yup.string().required(),
  productPrice: yup.number().required(),
  paymentType: yup.mixed().oneOf(['mensal', 'trimestral', 'anual']).required(),
})

export default function CreateUser() {
  const { push } = useRouter()
  const { user } = useAuth()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { register, handleSubmit, formState } = useForm<CreateCotacaoFormData>({
    resolver: yupResolver(createCotacaoFormSchema)
  })

  const { errors } = formState

  const [cotacao, setCotacao] = useState<Cotacao & { user_id: number }>()

  const handleProcess: SubmitHandler<CreateCotacaoFormData> = async (data) => {
    const { data: response } = await api.post<Cotacao & { user_id: number }>('/cotacoes/processamento', data)
    
    setCotacao(response)
    console.log({ response })
    onOpen()
  }

  const handleSave = async () => {
    const data = { ...cotacao }

    delete data.user_id

    await api.post('/cotacoes', data)
    
    onClose()
    push('/cotacoes')
  }

  const numberFormatter = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box 
          as="form" 
          flex="1"
          borderRadius={8} 
          bg="gray.800" 
          p={["6", "8"]} 
          onSubmit={handleSubmit(handleProcess)}
        >
          <Heading size="lg" fontWeight="normal">Criar cotação</Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="6">
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input label="Nome do produto" error={errors.productName} {...register('productName')}/>
              <Input label="Preço" error={errors.productPrice} {...register('productPrice')} />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input label="Recorrência" error={errors.paymentType} {...register('paymentType')}/>
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/cotacoes" passHref>
                <Button colorScheme="whiteAlpha">Cancelar</Button>
              </Link>

              <Button type="submit" colorScheme="pink" isLoading={formState.isSubmitting}>Processar</Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="gray.900">
          <ModalHeader>Cotação</ModalHeader>

          <ModalCloseButton />

          <ModalBody>
            Nome do produto: {cotacao?.productName} <br />
            Preço do produto: {cotacao && numberFormatter(cotacao.productPrice)} <br />
            Recorrência de pagamento: {cotacao?.paymentType} <br />
            Preço da parcela: {cotacao && numberFormatter(cotacao.portionPrice)}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' onClick={handleSave}>
              Salvar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}