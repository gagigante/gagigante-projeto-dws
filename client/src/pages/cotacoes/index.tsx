import { useEffect, useState } from 'react';
import { 
  Box,
  Flex,
  Heading,
  Button,
  Icon,
  Table,
  Tr,
  Th,
  Checkbox,
  Thead,
  Tbody,
  Td,
  Text, 
} from '@chakra-ui/react'
import Link from 'next/link'
import { RiAddLine, RiDeleteBinLine, RiPencilLine } from 'react-icons/ri';
import { useAuth } from '../../contexts/AuthContext'

import { Header } from '../../components/Header'
import { Sidebar } from '../../components/Sidebar'
import { useRouter } from 'next/router';
import { api } from '../../services/api';
import { Cotacao } from '../../models/Cotacao';

export default function UserList() {
  const { push } = useRouter();
  const { user } = useAuth();

  const [cotacoes, setCotacoes] = useState<Cotacao[]>([]);

  useEffect(() => {
    if (!user) {
      push('/')
    }
  }, [user])

  useEffect(() => {
    async function loadCotacoes() {
      const { data } = await api.get<Cotacao[]>('/cotacoes')

      setCotacoes(data)
    }

    loadCotacoes()
  }, [])

  async function handleDeleteCotacao(id: number) {
    await api.delete(`/cotacoes/${id}`)

    setCotacoes(prevState => prevState.filter(item => item.id !== id))
  }
  
  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">Cotações</Heading>

            <Link href="/cotacoes/create" passHref>
              <Button 
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar nova cotação
              </Button>
            </Link>
          </Flex>

          <Table colorScheme="whiteAlpha">
            <Thead>
              <Tr>
                <Th>Produto</Th>

                <Th>Preço</Th>

                <Th>Recorrência</Th>

                <Th>Valor da parcela</Th>

                <Th w="8"></Th>
              </Tr>
            </Thead>

            <Tbody>
              {cotacoes.map(item => (
                <Tr>
                  <Td>{item.productName}</Td>

                  <Td>
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(item.productPrice)}
                  </Td>

                  <Td>{item.paymentType}</Td>

                  <Td>
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(item.portionPrice)}
                  </Td>

                  <Td>
                    <Button 
                      as="a"
                      size="sm"
                      fontSize="sm"
                      colorScheme="red"
                      leftIcon={<Icon as={RiDeleteBinLine} fontSize="16" />}
                      onClick={() => handleDeleteCotacao(item.id)}
                    >
                      Excluir
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Flex>
    </Box>
  );
}