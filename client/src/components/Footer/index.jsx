import { Box, Container, Stack, Text, Link, Icon } from '@chakra-ui/react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

function Footer() {
  return (
    <Box bg="gray.800" color="white" py={8}>
      <Container maxW="container.xl">
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={8}
          justify="space-between"
          align="center"
        >
          <Text>&copy; 2024 Podcast Gear Sales. All rights reserved.</Text>
          
          <Stack direction="row" spacing={6}>
            <Link href="https://github.com/danielsantana9824/theLast/tree/main" target="_blank" _hover={{ color: 'gray.300' }}>
              <Icon as={FaGithub} w={6} h={6} />
            </Link>
            {/* <Link href="#" _hover={{ color: 'gray.300' }}>
              <Icon as={FaLinkedin} w={6} h={6} />
            </Link>
            <Link href="#" _hover={{ color: 'gray.300' }}>
              <Icon as={FaTwitter} w={6} h={6} />
            </Link> */}
          </Stack>
          
          <Stack direction="row" spacing={6}>
            <Link href="#" _hover={{ color: 'gray.300' }}>Privacy</Link>
            <Link href="#" _hover={{ color: 'gray.300' }}>Terms</Link>
            <Link href="#" _hover={{ color: 'gray.300' }}>Contact</Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default Footer;