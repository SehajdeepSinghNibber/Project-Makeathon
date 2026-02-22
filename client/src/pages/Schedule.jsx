import React, { useState, useEffect } from "react";
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Grid,
  GridItem,
  Card,
  CardBody,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
  IconButton,
  Flex,
  Badge,
  Tooltip,
  SimpleGrid,
  Icon,
} from "@chakra-ui/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  AddIcon,
  DeleteIcon,
  EditIcon,
} from "@chakra-ui/icons";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addDays,
  eachDayOfInterval,
  isToday,
  parseISO,
} from "date-fns";
import { FiCalendar, FiClock, FiMapPin, FiUsers, FiEdit3 } from "react-icons/fi";

const Schedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [meetings, setMeetings] = useState(() => {
    const saved = localStorage.getItem("nivesh_meetings");
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { 
    isOpen: isDetailOpen, 
    onOpen: onDetailOpen, 
    onClose: onDetailClose 
  } = useDisclosure();
  
  const toast = useToast();

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    startTime: "10:00",
    endTime: "11:00",
    description: "",
    participants: "",
  });

  useEffect(() => {
    localStorage.setItem("nivesh_meetings", JSON.stringify(meetings));
  }, [meetings]);

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const handleToday = () => setCurrentDate(new Date());

  const handleAddMeeting = (date) => {
    setFormData({
      ...formData,
      title: "",
      date: format(date, "yyyy-MM-dd"),
      description: "",
      participants: "",
    });
    setSelectedMeeting(null);
    onOpen();
  };

  const handleEditMeeting = (meeting) => {
    setSelectedMeeting(meeting);
    setFormData({
      title: meeting.title,
      date: meeting.date,
      startTime: meeting.startTime,
      endTime: meeting.endTime,
      description: meeting.description || "",
      participants: meeting.participants || "",
    });
    onDetailClose();
    onOpen();
  };

  const handleDeleteMeeting = (id) => {
    setMeetings(meetings.filter((m) => m.id !== id));
    toast({
      title: "Meeting deleted",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
    onDetailClose();
  };

  const handleSaveMeeting = (e) => {
    e.preventDefault();
    
    // Map time to HH:mm for datetime calculation
    const meetingDatetime = new Date(formData.date);
    const [h, m] = formData.startTime.split(":");
    meetingDatetime.setHours(parseInt(h), parseInt(m), 0, 0);

    const randomSuffix = Math.random().toString(36).substr(2, 3) + '-' + 
                        Math.random().toString(36).substr(2, 4) + '-' + 
                        Math.random().toString(36).substr(2, 3);

    if (selectedMeeting) {
      setMeetings(
        meetings.map((m) =>
          m.id === selectedMeeting.id ? { 
            ...m, 
            ...formData, 
            datetime: meetingDatetime.toISOString(),
            time: `${formData.startTime} - ${formData.endTime}` 
          } : m
        )
      );
      toast({
        title: "Meeting updated",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      const newMeeting = {
        ...formData,
        id: `meet-${Math.random().toString(36).substr(2, 9)}`,
        datetime: meetingDatetime.toISOString(),
        time: `${formData.startTime} - ${formData.endTime}`,
        status: "upcoming",
        meetLink: `https://meet.google.com/${randomSuffix}`,
        createdAt: new Date().toISOString()
      };
      setMeetings([...meetings, newMeeting]);
      toast({
        title: "Meeting scheduled",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
    onClose();
  };

  const renderHeader = () => {
    return (
      <Flex direction={{ base: "column", sm: "row" }} justify="space-between" align={{ base: "stretch", sm: "center" }} mb={8} gap={4}>
        <VStack align={{ base: "center", sm: "start" }} spacing={0}>
          <Heading size="lg" color="gray.900" fontWeight="800">
            {format(currentDate, "MMMM yyyy")}
          </Heading>
          <Text color="gray.500" fontWeight="600">
            Manage your financial consultations
          </Text>
        </VStack>
        <HStack spacing={3}>
          <Button
            size="sm"
            variant="outline"
            onClick={handleToday}
            borderRadius="full"
            fontWeight="700"
          >
            Today
          </Button>
          <HStack spacing={1}>
            <IconButton
              size="sm"
              icon={<ChevronLeftIcon />}
              onClick={handlePrevMonth}
              borderRadius="full"
              aria-label="Previous month"
            />
            <IconButton
              size="sm"
              icon={<ChevronRightIcon />}
              onClick={handleNextMonth}
              borderRadius="full"
              aria-label="Next month"
            />
          </HStack>
          <Button
            size="sm"
            colorScheme="brand"
            leftIcon={<AddIcon />}
            onClick={() => handleAddMeeting(new Date())}
            borderRadius="full"
            color="white"
            px={4}
          >
            New Meet
          </Button>
        </HStack>
      </Flex>
    );
  };

  const renderDays = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (
      <Grid templateColumns="repeat(7, 1fr)" mb={2}>
        {days.map((day) => (
          <GridItem key={day} textAlign="center">
            <Text fontSize="xs" fontWeight="700" color="gray.400" textTransform="uppercase" letterSpacing="widest">
              {day}
            </Text>
          </GridItem>
        ))}
      </Grid>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const calendarDays = eachDayOfInterval({
      start: startDate,
      end: endDate,
    });

    return (
      <Grid templateColumns="repeat(7, 1fr)" gap={pxToRem(1)} bg="gray.100" border="1px" borderColor="gray.100" borderRadius="2xl" overflow="hidden">
        {calendarDays.map((day, idx) => {
          const formattedDate = format(day, "yyyy-MM-dd");
          const dayMeetings = meetings.filter((m) => m.date === formattedDate);
          const isCurrentMonth = isSameMonth(day, monthStart);
          const isTodayDate = isToday(day);

          return (
            <GridItem
              key={idx}
              bg={isCurrentMonth ? "white" : "gray.50"}
              minH={{ base: "80px", md: "120px" }}
              p={2}
              onClick={() => handleAddMeeting(day)}
              cursor="pointer"
              _hover={{ bg: isCurrentMonth ? "brand.50" : "gray.100" }}
              transition="all 0.2s"
              position="relative"
            >
              <Flex justify="space-between" align="start" mb={1}>
                <Text
                  fontSize="sm"
                  fontWeight={isTodayDate ? "800" : "600"}
                  w={8}
                  h={8}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  borderRadius="full"
                  bg={isTodayDate ? "brand.500" : "transparent"}
                  color={isTodayDate ? "white" : isCurrentMonth ? "gray.900" : "gray.400"}
                >
                  {format(day, "d")}
                </Text>
              </Flex>
              <VStack align="stretch" spacing={1}>
                {dayMeetings.slice(0, 3).map((m) => (
                  <Box
                    key={m.id}
                    bg="brand.50"
                    color="brand.600"
                    p={1}
                    borderRadius="md"
                    fontSize="10px"
                    fontWeight="700"
                    noOfLines={1}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedMeeting(m);
                      onDetailOpen();
                    }}
                    _hover={{ transform: "translateY(-1px)", boxShadow: "sm" }}
                  >
                    {m.time ? m.time.split(' ')[0] : m.startTime} {m.title}
                  </Box>
                ))}
                {dayMeetings.length > 3 && (
                  <Text fontSize="9px" color="gray.400" fontWeight="700" textAlign="center">
                    +{dayMeetings.length - 3} more
                  </Text>
                )}
              </VStack>
            </GridItem>
          );
        })}
      </Grid>
    );
  };

  const pxToRem = (px) => `${px / 16}rem`;

  return (
    <Box className="fade-in">
      {renderHeader()}
      
      <Grid templateColumns={{ base: "1fr", lg: "3fr 1fr" }} gap={8}>
        {/* Left Side: Calendar */}
        <GridItem>
          <Card variant="elevated">
            <CardBody p={{ base: 2, md: 4 }}>
              {renderDays()}
              {renderCells()}
            </CardBody>
          </Card>
        </GridItem>

        {/* Right Side: Upcoming Meetings */}
        <GridItem>
          <VStack align="stretch" spacing={6}>
            <Card>
              <CardBody p={6}>
                <Heading size="sm" mb={4} color="black">Upcoming Meetings</Heading>
                <VStack align="stretch" spacing={4}>
                  {meetings
                    .filter(m => new Date(m.datetime || m.date) >= new Date())
                    .sort((a, b) => new Date(a.datetime || a.date) - new Date(b.datetime || b.date))
                    .slice(0, 5)
                    .map((m, idx) => (
                      <Box 
                        key={m.id} 
                        p={3} 
                        borderRadius="xl" 
                        border="1px" 
                        borderColor={idx === 0 ? "brand.200" : "gray.100"}
                        bg={idx === 0 ? "brand.50" : "white"}
                        cursor="pointer"
                        _hover={{ borderColor: "brand.300", bg: "brand.50" }}
                        onClick={() => {
                          setSelectedMeeting(m);
                          onDetailOpen();
                        }}
                        position="relative"
                      >
                        {idx === 0 && (
                          <Badge 
                            position="absolute" 
                            top="-2" 
                            right="2" 
                            colorScheme="brand" 
                            fontSize="9px"
                            borderRadius="full"
                            px={2}
                          >
                            Next Up
                          </Badge>
                        )}
                        <Text fontWeight="800" fontSize="sm" color="black" noOfLines={1}>{m.title}</Text>
                        <HStack spacing={2} mt={1}>
                          <Icon as={FiCalendar} size="12px" color="brand.500" />
                          <Text fontSize="xs" color="gray.500" fontWeight="600">
                            {format(parseISO(m.datetime || m.date), "MMM d, yyyy")}
                          </Text>
                        </HStack>
                        <HStack spacing={2} mt={0.5}>
                          <Icon as={FiClock} size="12px" color="brand.500" />
                          <Text fontSize="xs" color="gray.500" fontWeight="600">
                            {m.time || `${m.startTime} - ${m.endTime}`}
                          </Text>
                        </HStack>
                        {idx === 0 && m.meetLink && (
                          <Button 
                            size="xs" 
                            mt={3} 
                            w="full" 
                            colorScheme="brand" 
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(m.meetLink, "_blank");
                            }}
                            borderRadius="full"
                          >
                            Join Meeting
                          </Button>
                        )}
                      </Box>
                    ))}
                  {meetings.filter(m => new Date(m.datetime || m.date) >= new Date()).length === 0 && (
                    <VStack py={10} spacing={2}>
                      <Icon as={FiCalendar} w={10} h={10} color="gray.200" />
                      <Text fontSize="sm" color="gray.400" fontWeight="600">No upcoming meetings scheduled</Text>
                      <Button size="xs" colorScheme="brand" variant="ghost" onClick={() => handleAddMeeting(new Date())} borderRadius="full">
                        Schedule now
                      </Button>
                    </VStack>
                  )}
                </VStack>
              </CardBody>
            </Card>

            <Card bg="brand.500" color="white" borderRadius="2xl">
              <CardBody p={6}>
                <VStack align="start" spacing={3}>
                  <Box p={3} bg="whiteAlpha.300" borderRadius="xl">
                    <Icon as={FiUsers} w={6} h={6} />
                  </Box>
                  <Heading size="sm">New Consultation?</Heading>
                  <Text fontSize="xs" fontWeight="500" opacity={0.9}>
                    Need expert advice on your portfolio? Schedule a session with our advisors.
                  </Text>
                  <Button 
                    size="sm" 
                    bg="white" 
                    color="brand.500" 
                    _hover={{ bg: "gray.50", transform: "translateY(-1px)", boxShadow: "lg" }} 
                    w="full" 
                    borderRadius="full" 
                    fontWeight="800"
                    onClick={() => window.location.href = "/advice"}
                  >
                    Find Advisor
                  </Button>
                </VStack>
              </CardBody>
            </Card>
          </VStack>
        </GridItem>
      </Grid>

      {/* Add/Edit Meeting Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
        <ModalOverlay backdropFilter="blur(4px)" />
        <ModalContent borderRadius="2xl" border="none" boxShadow="2xl">
          <form onSubmit={handleSaveMeeting}>
            <ModalHeader fontSize="xl" fontWeight="800">
              {selectedMeeting ? "Edit Meeting" : "Schedule Meeting"}
            </ModalHeader>
            <ModalCloseButton borderRadius="full" />
            <ModalBody>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel fontSize="sm" fontWeight="700" color="gray.700">Meeting Title</FormLabel>
                  <Input
                    placeholder="e.g. Portfolio Review"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </FormControl>
                
                <FormControl isRequired>
                  <FormLabel fontSize="sm" fontWeight="700" color="gray.700">Date</FormLabel>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </FormControl>

                <HStack w="full" spacing={4}>
                  <FormControl isRequired>
                    <FormLabel fontSize="sm" fontWeight="700" color="gray.700">Start Time</FormLabel>
                    <Input
                      type="time"
                      value={formData.startTime}
                      onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel fontSize="sm" fontWeight="700" color="gray.700">End Time</FormLabel>
                    <Input
                      type="time"
                      value={formData.endTime}
                      onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    />
                  </FormControl>
                </HStack>

                <FormControl>
                  <FormLabel fontSize="sm" fontWeight="700" color="gray.700">Description</FormLabel>
                  <Textarea
                    placeholder="Brief objective of the meeting..."
                    borderRadius="xl"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize="sm" fontWeight="700" color="gray.700">Participants (Optional)</FormLabel>
                  <Input
                    placeholder="Emails separated by commas"
                    value={formData.participants}
                    onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
                  />
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter gap={3}>
              <Button variant="ghost" onClick={onClose} borderRadius="full">Cancel</Button>
              <Button type="submit" colorScheme="brand" borderRadius="full" px={8} color="white">
                {selectedMeeting ? "Update" : "Schedule"}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      {/* Meeting Details Modal */}
      <Modal isOpen={isDetailOpen} onClose={onDetailClose} isCentered>
        <ModalOverlay backdropFilter="blur(4px)" />
        <ModalContent borderRadius="2xl" border="none" boxShadow="2xl">
          <ModalHeader fontSize="xl" fontWeight="800">Meeting Details</ModalHeader>
          <ModalCloseButton borderRadius="full" />
          <ModalBody pb={6}>
            {selectedMeeting && (
              <VStack align="stretch" spacing={4}>
                <Box>
                  <Heading size="md" color="gray.900" mb={2}>{selectedMeeting.title}</Heading>
                  <Badge colorScheme="brand" variant="subtle" borderRadius="full" px={3}>
                    Confirmed
                  </Badge>
                </Box>
                
                <VStack align="stretch" spacing={3} bg="gray.50" p={4} borderRadius="xl">
                  <HStack spacing={3}>
                    <Icon as={FiCalendar} color="brand.500" />
                    <Text fontSize="sm" fontWeight="700" color="gray.700">
                      {format(parseISO(selectedMeeting.date), "EEEE, MMMM d, yyyy")}
                    </Text>
                  </HStack>
                  <HStack spacing={3}>
                    <Icon as={FiClock} color="brand.500" />
                    <Text fontSize="sm" fontWeight="700" color="gray.700">
                      {selectedMeeting.time || `${selectedMeeting.startTime} - ${selectedMeeting.endTime}`}
                    </Text>
                  </HStack>
                  {selectedMeeting.meetLink && (
                    <Button 
                      leftIcon={<Icon as={FiCalendar} />} 
                      colorScheme="brand" 
                      size="sm" 
                      w="full" 
                      mt={2}
                      onClick={() => window.open(selectedMeeting.meetLink, "_blank")}
                      borderRadius="xl"
                    >
                      Join Google Meet
                    </Button>
                  )}
                  {selectedMeeting.participants && (
                    <HStack spacing={3}>
                      <Icon as={FiUsers} color="brand.500" />
                      <Box>
                        <Text fontSize="sm" fontWeight="700" color="gray.700">Participants</Text>
                        <Text fontSize="xs" color="gray.500">{selectedMeeting.participants}</Text>
                      </Box>
                    </HStack>
                  )}
                </VStack>

                {selectedMeeting.description && (
                  <Box>
                    <Text fontSize="sm" fontWeight="700" color="gray.700" mb={1}>Description</Text>
                    <Text fontSize="sm" color="gray.600">{selectedMeeting.description}</Text>
                  </Box>
                )}

                <HStack justify="flex-end" pt={4} spacing={3}>
                  <IconButton
                    aria-label="Delete meeting"
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    variant="ghost"
                    onClick={() => handleDeleteMeeting(selectedMeeting.id)}
                    borderRadius="full"
                  />
                  <Button
                    leftIcon={<EditIcon />}
                    variant="outline"
                    colorScheme="brand"
                    onClick={() => handleEditMeeting(selectedMeeting)}
                    borderRadius="full"
                    fontWeight="700"
                  >
                    Edit Details
                  </Button>
                </HStack>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Schedule;
