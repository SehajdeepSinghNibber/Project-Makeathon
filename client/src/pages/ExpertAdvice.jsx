import { useState } from "react";
import {
  Box,
  Container,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  Badge,
  Button,
  Stack,
  Avatar,
  Divider,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { FaGoogle, FaPhone, FaEnvelope, FaCalendar } from "react-icons/fa";

const ExpertAdvice = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [selectedConsultant, setSelectedConsultant] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
  });

  const consultants = [
    {
      id: 1,
      name: "Rajesh Kumar",
      specialization: "Equity Funds",
      experience: "12+ years",
      availability: "Mon–Fri, 10 AM – 5 PM",
    },
    {
      id: 2,
      name: "Priya Sharma",
      specialization: "Debt & Fixed Income",
      experience: "10+ years",
      availability: "Tue–Thu, 2 PM – 6 PM",
    },
    {
      id: 3,
      name: "Amit Patel",
      specialization: "Hybrid Funds",
      experience: "8+ years",
      availability: "Mon–Wed–Fri, 9 AM – 4 PM",
    },
    {
      id: 4,
      name: "Deepika Singh",
      specialization: "Sector Focused Funds",
      experience: "9+ years",
      availability: "Mon–Sat, 11 AM – 7 PM",
    },
    {
      id: 5,
      name: "Vikram Desai",
      specialization: "International Funds",
      experience: "11+ years",
      availability: "Daily, 8 AM – 8 PM",
    },
    {
      id: 6,
      name: "Anirudh Gupta",
      specialization: "Scheme Oriented Funds",
      experience: "7+ years",
      availability: "Tue–Sat, 10 AM – 6 PM",
    },
    {
      id: 7,
      name: "Sanjay Verma",
      specialization: "Growth Funds",
      experience: "13+ years",
      availability: "Mon–Fri, 9 AM – 3 PM",
    },
    {
      id: 8,
      name: "Ananya Chatterjee",
      specialization: "Tax Planning",
      experience: "9+ years",
      availability: "Wed–Sun, 2 PM – 8 PM",
    },
    {
      id: 9,
      name: "Rohan Khanna",
      specialization: "Emerging Market Funds",
      experience: "10+ years",
      availability: "Mon–Thu, 11 AM – 5 PM",
    },
    {
      id: 10,
      name: "Shreya Mishra",
      specialization: "Balanced Portfolio",
      experience: "8+ years",
      availability: "Tue–Fri–Sun, 10 AM – 7 PM",
    },
  ];

  const handleScheduleMeet = (consultant) => {
    setSelectedConsultant(consultant);
    setFormData({ name: "", email: "", date: "", time: "" });
    onOpen();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!Object.values(formData).every(Boolean)) {
      toast({
        title: "Incomplete form",
        status: "warning",
        duration: 3000,
      });
      return;
    }

    // Map "10 AM" to 24h format for datetime calculation
    const hourMap = {
      "10 AM": 10,
      "11 AM": 11,
      "2 PM": 14,
      "4 PM": 16,
    };

    const hour = hourMap[formData.time] || 10;
    const meetingDatetime = new Date(formData.date);
    meetingDatetime.setHours(hour, 0, 0, 0);

    // Validation: Prevent scheduling in the past
    if (meetingDatetime < new Date()) {
      toast({
        title: "Invalid Date/Time",
        description: "You cannot schedule a meeting in the past.",
        status: "error",
        duration: 3000,
      });
      return;
    }

    const meetingId = `meet-${Math.random().toString(36).substr(2, 9)}`;
    const randomSuffix = Math.random().toString(36).substr(2, 3) + '-' + 
                        Math.random().toString(36).substr(2, 4) + '-' + 
                        Math.random().toString(36).substr(2, 3);
    
    const newMeeting = {
      id: meetingId,
      title: `Consultation with ${selectedConsultant.name}`,
      date: formData.date,
      time: formData.time,
      datetime: meetingDatetime.toISOString(),
      status: "upcoming",
      meetLink: `https://meet.google.com/${randomSuffix}`,
      createdAt: new Date().toISOString()
    };

    // Save to localStorage
    const existingMeetings = JSON.parse(localStorage.getItem("nivesh_meetings") || "[]");
    localStorage.setItem("nivesh_meetings", JSON.stringify([...existingMeetings, newMeeting]));

    toast({
      title: "Meeting Scheduled Successfully",
      description: `Your session with ${selectedConsultant.name} is confirmed for ${formData.date} at ${formData.time}.`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });

    onClose();
  };

  return (
    <Container maxW="6xl" py={10}>
      <Stack spacing={6} textAlign="center">
        <Heading color="black">Expert Financial Advisors</Heading>
        <Text color="gray.800">
          Book a 1-on-1 session with experienced mutual fund professionals
        </Text>
      </Stack>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mt={10}>
        {consultants.map((c) => (
          <Card key={c.id}>
            <CardHeader>
              <HStack spacing={4}>
                <Avatar name={c.name} />
                <Stack spacing={0}>
                  <Heading size="sm" color="black">{c.name}</Heading>
                  <Badge colorScheme="brand">{c.experience}</Badge>
                </Stack>
              </HStack>
            </CardHeader>

            <CardBody>
              <Stack spacing={3}>
                <Badge width="fit-content">{c.specialization}</Badge>

                <Divider />

                <HStack>
                  <Icon as={FaCalendar} />
                  <Text fontSize="sm">{c.availability}</Text>
                </HStack>

                <Button
                  leftIcon={<FaCalendar />}
                  variant="outline"
                  colorScheme="brand"
                  onClick={() => handleScheduleMeet(c)}
                  borderRadius="full"
                >
                  Schedule Meet
                </Button>
              </Stack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay backdropFilter="blur(4px)" />
        <ModalContent borderRadius="2xl">
          <ModalHeader>Schedule with {selectedConsultant?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Your Name</FormLabel>
                <Input
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Select Date</FormLabel>
                <Input
                  type="date"
                  name="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={formData.date}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Preferred Time Slot</FormLabel>
                <Select
                  name="time"
                  placeholder="Select time"
                  value={formData.time}
                  onChange={handleChange}
                >
                  <option value="10 AM">10 AM (Morning)</option>
                  <option value="11 AM">11 AM (Morning)</option>
                  <option value="2 PM">2 PM (Afternoon)</option>
                  <option value="4 PM">4 PM (Evening)</option>
                </Select>
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose} variant="ghost" borderRadius="full">
              Cancel
            </Button>
            <Button
              colorScheme="brand"
              leftIcon={<FaCalendar />}
              onClick={handleSubmit}
              borderRadius="full"
              px={8}
              color="white"
            >
              Schedule Meet
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default ExpertAdvice;
