import React, { useState } from 'react'
import {
  Box,
  Container,
  VStack,
  HStack,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Divider,
  Input,
  Select,
  Button,
  Alert,
  AlertIcon,
  Heading,
  Text,
  Link,
  Flex,
  useToast,
  Icon,
} from '@chakra-ui/react'
import { useAuth } from '../utils/authContext.jsx'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowLeft } from 'react-icons/fi'

const Login = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    monthlyIncome: '',
    investmentHorizon: '',
    riskAppetite: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login, register } = useAuth()
  const navigate = useNavigate()
  const toast = useToast()

  const textColor = 'gray.800'
  const headingColor = 'gray.900'

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const showToast = (title, description, status = 'error') => {
    toast({
      title,
      description,
      status,
      duration: 5000,
      isClosable: true,
      position: 'top',
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (isLogin) {
        await login({
          email: formData.email,
          password: formData.password
        })
        showToast('Login Successful', 'Welcome back to Nivesh Assist!', 'success')
      } else {
        await register(formData)
        showToast('Registration Successful', 'Welcome to Nivesh Assist!', 'success')
      }
      navigate('/dashboard')
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || 'Authentication failed. Please try again.')
      } else {
        setError('An unexpected error occurred. Please check your connection.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box minH="100vh" bg="gray.50" py={20}>
      <Container maxW="container.md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <VStack spacing={8}>
            <Link href="/" _hover={{ textDecoration: 'none' }}>
              <HStack spacing={2} color="brand.500" fontWeight="800">
                <Icon as={FiArrowLeft} />
                <Text fontSize="sm">Back to Home</Text>
              </HStack>
            </Link>

            <Box textAlign="center">
              <Heading size="lg" color="brand.500" fontWeight="800" mb={4}>
                Nivesh Assist
              </Heading>
              <Heading size="xl" color={headingColor} mb={2}>
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </Heading>
              <Text color={textColor}>
                {isLogin
                  ? 'Sign in to manage your financial future'
                  : 'Start your investment journey with us today'
                }
              </Text>
            </Box>

            <Card w="full" maxW="md" variant="elevated" boxShadow="2xl">
              <CardBody p={10}>
                <VStack spacing={6}>
                  {error && (
                    <Alert status="error" borderRadius="lg">
                      <AlertIcon />
                      <Text fontSize="sm">{error}</Text>
                    </Alert>
                  )}

                  <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <VStack spacing={5}>
                      {!isLogin && (
                        <>
                          <FormControl isRequired>
                            <FormLabel fontSize="sm" fontWeight="700" color={"gray"}>Full Name</FormLabel>
                            <Input
                              color={"black"}
                              type="text"
                              name="name"
                              placeholder="John Doe"
                              _placeholder={{ color: "gray" }}
                              value={formData.name}
                              onChange={handleChange}
                              h="12"
                            />
                          </FormControl>

                          <FormControl isRequired>
                            <FormLabel fontSize="sm" fontWeight="700" color={"gray"}>Age</FormLabel>
                            <Input
                              color={"black"}
                              _placeholder={{color: "gray"}}
                              type="number"
                              name="age"
                              placeholder="25"
                              value={formData.age}
                              onChange={handleChange}
                              h="12"
                            />
                          </FormControl>

                          <FormControl isRequired>
                            <FormLabel fontSize="sm" fontWeight="700" color={"gray"}>Monthly Income Range</FormLabel>
                            <Select
                              color={"gray"}
                              name="monthlyIncome"
                              value={formData.monthlyIncome}
                              onChange={handleChange}
                              h="12"
                              placeholder="Select range"
                            >
                              <option value="0-400000">₹0 - ₹4,00,000</option>
                              <option value="400001-800000">₹4,00,001 - ₹8,00,000</option>
                              <option value="800001-1200000">₹8,00,001 - ₹12,00,000</option>
                              <option value="1200001+">₹12,00,001+</option>
                            </Select>
                          </FormControl>
                        </>
                      )}

                      <FormControl isRequired>
                        <FormLabel fontSize="sm" fontWeight="700" color={"gray"}>Email Address</FormLabel>
                        <Input
                          type="email"
                          bg={"white"}
                          color={"black"}
                          name="email"
                          placeholder="name@email.com"
                          _placeholder={{ color: "gray.500" }}
                          value={formData.email}
                          onChange={handleChange}
                          h="12"
                        />
                      </FormControl>

                      <FormControl isRequired>
                        <FormLabel fontSize="sm" fontWeight="700" color={"gray"}>Password</FormLabel>
                        <Input
                          bg={"white"}
                          color={"black"}
                          type="password"
                          name="password"
                          placeholder="••••••••"
                          _placeholder={{ color: "gray.500" }}
                          value={formData.password}
                          onChange={handleChange}
                          h="12"
                        />
                      </FormControl>

                      <Button
                        type="submit"
                        colorScheme="brand"
                        size="lg"
                        w="full"
                        h="14"
                        borderRadius="full"
                        isLoading={loading}
                        loadingText="Processing..."
                        fontSize="md"
                        fontWeight="700"
                        color={"white"}
                        mt={4}
                      >
                        {isLogin ? 'Log In' : 'Sign Up'}
                      </Button>
                    </VStack>
                  </form>

                  <Divider />

                  <Text textAlign="center" fontSize="sm" color={textColor}>
                    {isLogin ? "New to Nivesh Assist?" : "Already have an account?"}
                    <Button
                      variant="link"
                      colorScheme="brand"
                      ml={2}
                      fontSize="sm"
                      fontWeight="700"
                      onClick={() => setIsLogin(!isLogin)}
                    >
                      {isLogin ? 'Create an account' : 'Log in here'}
                    </Button>
                  </Text>
                </VStack>
              </CardBody>
            </Card>

            <HStack spacing={6} pt={4}>
              <Link fontSize="xs" color="gray.400">Privacy Policy</Link>
              <Link fontSize="xs" color="gray.400">Terms of Service</Link>
              <Link fontSize="xs" color="gray.400">Help Center</Link>
            </HStack>
          </VStack>
        </motion.div>
      </Container>
    </Box>
  )
}

export default Login
