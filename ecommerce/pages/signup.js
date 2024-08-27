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
 const signUpSchema = yup.object().shape({
    name:  yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(8, 'Password should be at least 8 characters').required('Password is required'),
  });
  

const SignUpPage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        // validate form 
     try {
        loginSchema.validate({
            name,
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
        <Heading>Create an Account</Heading>
        <HStack>
          <Text>Already have an account?</Text>
          <Link href="/login" passHref>
          <Button variant="link" colorScheme="pink">
            Sign in
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
                <FormLabel htmlFor="email">Full Name</FormLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your Full Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
              <FormHelperText
                    color={"red.500"}
                    id='name-helper-text'
                >
                    {error.name}
                </FormHelperText>

              <FormControl>
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormHelperText
                    color={"red.500"}
                    id='email-helper-text'
                >
                    {error.email}
                </FormHelperText>

              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <FormHelperText
                    color={"red.500"}
                    id='email-helper-text'
                >
                    {error.password}
                </FormHelperText>

            </Stack>
            <Stack>
              <Button colorScheme="pink" type="submit">Sign up</Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Container>
  )
}

export default SignUpPage