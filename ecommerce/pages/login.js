import React, {useState} from 'react'
import {
    Container,
    Stack,
    Heading,
    HStack,
    Text,
    Button,
    Box,
    FormControl,
    FormLabel,
    Input,
    useBreakpointValue,
    useColorModeValue,
    FormHelperText
} from '@chakra-ui/react'
import Link from 'next/link'
import * as yup from 'yup'

 // regla de validación con yup
 // https://github.com/jquense/yup/tree/pre-v1
const loginSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(8, 'Password should be at least 8 characters').required('Password is required'),
  });
  

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
     // validate form 
     try {
        loginSchema.validate({
            email,
            password
        },{
            abortEarly: false
        })
    }catch(err){
        const validationError = {}
        if(err instanceof yup.validationError){
            err.inner.forEach(({path, message })=>{
                validationError[path] = message
            })
        }
        setErrror(validationError)
        return
    }
   setEmail('')
   setPassword('')
  }

  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      <Stack spacing="8">
        <Stack spacing="6" textAlign="center">
          <Heading>Log in to your account</Heading>
          <HStack>
            <Text>Dont have an account?</Text>
            <Link href="/signup" passHref>
            <Button variant="link" colorScheme="pink">
              Sign up
            </Button>
            </Link>
          </HStack>
        </Stack>
      </Stack>

      <Box
        py={{ base: "0", sm: "8" }}
        px={{ base: "4", sm: "10" }}
        bg={useBreakpointValue({ base: "transparent", sm: "bg-surface" })}
        boxShadow={{ base: "none", sm: useColorModeValue("md", "md-dark") }}
        borderRadius={{ base: "none", sm: "xl" }}
      >

        <form onSubmit={handleSubmit}>
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FormHelperText
                    color={"red.500"}
                    id='email-helper-text'
                >
                    {error.email}
                </FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                 <FormHelperText
                    color={"red.500"}
                    id='password-helper-text'
                >
                    {error.password}
                </FormHelperText>
              </FormControl>
            </Stack>
            <HStack justify="space-between">
              <Button variant="link" colorScheme="pink" size="sm">
                Forgot Password?
              </Button>
            </HStack>
            <Stack>
              <Button colorScheme="pink" type="submit">Sign in</Button>
            </Stack>
          </Stack>
        </form>
      </Box>
      </Container>
  )
}

export default LoginPage