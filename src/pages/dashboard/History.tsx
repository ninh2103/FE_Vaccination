"use client"

import { useState } from "react"
import { Search, Filter, Download, MoreHorizontal, FileText, Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data
const vaccinationHistory = [
  {
    id: 1,
    patient: {
      name: "John Doe",
      avatar: "/placeholder.svg",
      initials: "JD",
      phone: "+1 (555) 123-4567",
      email: "john.doe@example.com",
    },
    vaccine: "COVID-19 Vaccine",
    date: "2023-03-01",
    time: "09:15 AM",
    doseNumber: 1,
    batchNumber: "BNT162b2-001",
    administeredBy: "Dr. Thomas Clark",
    location: "Main Clinic",
    notes: "No adverse reactions",
  },
  {
    id: 2,
    patient: {
      name: "Jane Smith",
      avatar: "/placeholder.svg",
      initials: "JS",
      phone: "+1 (555) 987-6543",
      email: "jane.smith@example.com",
    },
    vaccine: "Influenza Vaccine",
    date: "2023-03-02",
    time: "10:30 AM",
    doseNumber: 1,
    batchNumber: "INFL-2023-045",
    administeredBy: "Nurse Jennifer Adams",
    location: "Main Clinic",
    notes: "Mild soreness at injection site",
  },
  {
    id: 3,
    patient: {
      name: "Robert Johnson",
      avatar: "/placeholder.svg",
      initials: "RJ",
      phone: "+1 (555) 456-7890",
      email: "robert.johnson@example.com",
    },
    vaccine: "Tetanus Vaccine",
    date: "2023-03-03",
    time: "11:45 AM",
    doseNumber: 1,
    batchNumber: "TET-2023-078",
    administeredBy: "Dr. Thomas Clark",
    location: "Downtown Branch",
    notes: "Patient reported previous mild reaction to tetanus vaccine",
  },
  {
    id: 4,
    patient: {
      name: "Emily Wilson",
      avatar: "/placeholder.svg",
      initials: "EW",
      phone: "+1 (555) 234-5678",
      email: "emily.wilson@example.com",
    },
    vaccine: "Hepatitis B Vaccine",
    date: "2023-03-04",
    time: "02:00 PM",
    doseNumber: 2,
    batchNumber: "HEP-B-2023-112",
    administeredBy: "Nurse Jennifer Adams",
    location: "Main Clinic",
    notes: "Second dose in series of three",
  },
  {
    id: 5,
    patient: {
      name: "Michael Brown",
      avatar: "/placeholder.svg",
      initials: "MB",
      phone: "+1 (555) 876-5432",
      email: "michael.brown@example.com",
    },
    vaccine: "COVID-19 Vaccine",
    date: "2023-03-05",
    time: "03:30 PM",
    doseNumber: 2,
    batchNumber: "BNT162b2-002",
    administeredBy: "Dr. Thomas Clark",
    location: "Downtown Branch",
    notes: "Completed primary series",
  },
  {
    id: 6,
    patient: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg",
      initials: "SJ",
      phone: "+1 (555) 345-6789",
      email: "sarah.johnson@example.com",
    },
    vaccine: "MMR Vaccine",
    date: "2023-03-06",
    time: "09:45 AM",
    doseNumber: 1,
    batchNumber: "MMR-2023-056",
    administeredBy: "Nurse Jennifer Adams",
    location: "Main Clinic",
    notes: "First dose in series of two",
  },
  {
    id: 7,
    patient: {
      name: "David Lee",
      avatar: "/placeholder.svg",
      initials: "DL",
      phone: "+1 (555) 567-8901",
      email: "david.lee@example.com",
    },
    vaccine: "Pneumococcal Vaccine",
    date: "2023-03-07",
    time: "11:00 AM",
    doseNumber: 1,
    batchNumber: "PNEU-2023-089",
    administeredBy: "Dr. Thomas Clark",
    location: "Downtown Branch",
    notes: "Patient has history of asthma",
  },
  {
    id: 8,
    patient: {
      name: "Lisa Wang",
      avatar: "/placeholder.svg",
      initials: "LW",
      phone: "+1 (555) 678-9012",
      email: "lisa.wang@example.com",
    },
    vaccine: "HPV Vaccine",
    date: "2023-03-08",
    time: "01:15 PM",
    doseNumber: 1,
    batchNumber: "HPV-2023-034",
    administeredBy: "Nurse Jennifer Adams",
    location: "Main Clinic",
    notes: "First dose in series of three",
  },
  {
    id: 9,
    patient: {
      name: "James Wilson",
      avatar: "/placeholder.svg",
      initials: "JW",
      phone: "+1 (555) 789-0123",
      email: "james.wilson@example.com",
    },
    vaccine: "Varicella Vaccine",
    date: "2023-03-09",
    time: "02:45 PM",
    doseNumber: 1,
    batchNumber: "VAR-2023-067",
    administeredBy: "Dr. Thomas Clark",
    location: "Downtown Branch",
    notes: "No history of chickenpox",
  },
  {
    id: 10,
    patient: {
      name: "Maria Garcia",
      avatar: "/placeholder.svg",
      initials: "MG",
      phone: "+1 (555) 890-1234",
      email: "maria.garcia@example.com",
    },
    vaccine: "COVID-19 Vaccine",
    date: "2023-03-10",
    time: "04:00 PM",
    doseNumber: 3,
    batchNumber: "BNT162b2-003",
    administeredBy: "Nurse Jennifer Adams",
    location: "Main Clinic",
    notes: "Booster dose",
  },
]

export default function VaccinationHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
  const [selectedVaccination, setSelectedVaccination] = useState<any>(null)

  const filteredVaccinations = vaccinationHistory.filter(
    (vaccination) =>
      vaccination.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vaccination.vaccine.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vaccination.administeredBy.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Vaccination History</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              placeholder="Search vaccination history..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
              type="search"
            />
            <Button variant="outline" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="all">All Vaccinations</TabsTrigger>
            <TabsTrigger value="covid">COVID-19 Vaccinations</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Vaccine</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Dose</TableHead>
                      <TableHead>Batch Number</TableHead>
                      <TableHead>Administered By</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead className="w-[80px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredVaccinations.map((vaccination) => (
                      <TableRow
                        key={vaccination.id}
                        className="cursor-pointer transition-colors hover:bg-muted/50"
                        onClick={() => {
                          setSelectedVaccination(vaccination)
                          setOpenDetailsDialog(true)
                        }}
                      >
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={vaccination.patient.avatar} alt={vaccination.patient.name} />
                              <AvatarFallback>{vaccination.patient.initials}</AvatarFallback>
                            </Avatar>
                            <div>{vaccination.patient.name}</div>
                          </div>
                        </TableCell>
                        <TableCell>{vaccination.vaccine}</TableCell>
                        <TableCell>{vaccination.date}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{vaccination.doseNumber}</Badge>
                        </TableCell>
                        <TableCell>{vaccination.batchNumber}</TableCell>
                        <TableCell>{vaccination.administeredBy}</TableCell>
                        <TableCell>{vaccination.location}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <FileText className="mr-2 h-4 w-4" />
                                View Certificate
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="mr-2 h-4 w-4" />
                                Download Record
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <div className="flex items-center justify-end space-x-2 py-4">
              <Button variant="outline" size="sm">
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="covid" className="mt-4">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Dose</TableHead>
                      <TableHead>Batch Number</TableHead>
                      <TableHead>Administered By</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead className="w-[80px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredVaccinations
                      .filter((vaccination) => vaccination.vaccine === "COVID-19 Vaccine")
                      .map((vaccination) => (
                        <TableRow
                          key={vaccination.id}
                          className="cursor-pointer transition-colors hover:bg-muted/50"
                          onClick={() => {
                            setSelectedVaccination(vaccination)
                            setOpenDetailsDialog(true)
                          }}
                        >
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={vaccination.patient.avatar} alt={vaccination.patient.name} />
                                <AvatarFallback>{vaccination.patient.initials}</AvatarFallback>
                              </Avatar>
                              <div>{vaccination.patient.name}</div>
                            </div>
                          </TableCell>
                          <TableCell>{vaccination.date}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{vaccination.doseNumber}</Badge>
                          </TableCell>
                          <TableCell>{vaccination.batchNumber}</TableCell>
                          <TableCell>{vaccination.administeredBy}</TableCell>
                          <TableCell>{vaccination.location}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <FileText className="mr-2 h-4 w-4" />
                                  View Certificate
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Download className="mr-2 h-4 w-4" />
                                  Download Record
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Vaccination Record Details</DialogTitle>
            <DialogDescription>View complete vaccination record information.</DialogDescription>
          </DialogHeader>
          {selectedVaccination && (
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={selectedVaccination.patient.avatar} alt={selectedVaccination.patient.name} />
                  <AvatarFallback>{selectedVaccination.patient.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{selectedVaccination.patient.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedVaccination.patient.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Vaccine</h4>
                  <p>{selectedVaccination.vaccine}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Dose Number</h4>
                  <p>{selectedVaccination.doseNumber}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Date</h4>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <p>{selectedVaccination.date}</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Time</h4>
                  <p>{selectedVaccination.time}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Batch Number</h4>
                  <p>{selectedVaccination.batchNumber}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Location</h4>
                  <p>{selectedVaccination.location}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Administered By</h4>
                <p>{selectedVaccination.administeredBy}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Notes</h4>
                <p>{selectedVaccination.notes}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Contact Information</h4>
                <p className="text-sm">{selectedVaccination.patient.phone}</p>
                <p className="text-sm">{selectedVaccination.patient.email}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDetailsDialog(false)}>
              Close
            </Button>
            <Button onClick={() => setOpenDetailsDialog(false)}>
              <FileText className="mr-2 h-4 w-4" />
              Download Certificate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

