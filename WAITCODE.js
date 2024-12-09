"use client"

import React, { useState, useEffect, useMemo } from 'react';
import { Search, Building2, MapPin, Phone, Mail, X, UserPlus, Download, Filter } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Données d'exemple des employés
const sampleEmployees = [
  {
    id: 1,
    name: "Sophie Martin",
    role: "Développeuse Full Stack",
    department: "Ingénierie",
    email: "sophie.martin@company.com",
    phone: "+33 1 23 45 67 89",
    location: "Paris",
    imageUrl: "/api/placeholder/150/150"
  },
  {
    id: 2,
    name: "Thomas Bernard",
    role: "Chef de Projet",
    department: "Management",
    email: "thomas.bernard@company.com",
    phone: "+33 1 23 45 67 90",
    location: "Lyon",
    imageUrl: "/api/placeholder/150/150"
  },
  {
    id: 3,
    name: "Marie Dubois",
    role: "Designer UX/UI",
    department: "Design",
    email: "marie.dubois@company.com",
    phone: "+33 1 23 45 67 91",
    location: "Paris",
    imageUrl: "/api/placeholder/150/150"
  },
  {
    id: 4,
    name: "Lucas Petit",
    role: "Architecte Cloud",
    department: "Infrastructure",
    email: "lucas.petit@company.com",
    phone: "+33 1 23 45 67 92",
    location: "Bordeaux",
    imageUrl: "/api/placeholder/150/150"
  },
  {
    id: 5,
    name: "Emma Richard",
    role: "Product Owner",
    department: "Management",
    email: "emma.richard@company.com",
    phone: "+33 1 23 45 67 93",
    location: "Nantes",
    imageUrl: "/api/placeholder/150/150"
  },
  {
    id: 6,
    name: "Hugo Moreau",
    role: "Data Scientist",
    department: "Data",
    email: "hugo.moreau@company.com",
    phone: "+33 1 23 45 67 94",
    location: "Paris",
    imageUrl: "/api/placeholder/150/150"
  }
];

const EmployeeDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchFocused, setSearchFocused] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [view, setView] = useState('grid');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const departments = useMemo(() => {
    return ['all', ...new Set(sampleEmployees.map(e => e.department))];
  }, []);

  const filteredEmployees = useMemo(() => {
    return sampleEmployees.filter(employee => {
      const matchesSearch = (
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.role.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      return matchesSearch && (
        selectedDepartment === 'all' || 
        employee.department === selectedDepartment
      );
    });
  }, [searchTerm, selectedDepartment]);

  const handleExport = () => {
    const csvContent = 'data:text/csv;charset=utf-8,' + 
      'Nom,Rôle,Département,Email,Téléphone,Localisation\n' +
      filteredEmployees.map(e => 
        `${e.name},${e.role},${e.department},${e.email},${e.phone},${e.location}`
      ).join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'employees.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const EmployeeCard = ({ employee, index }) => (
    <div
      className={`transition-all duration-700 ease-out transform
        ${isLoading ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <Card 
        className="group backdrop-blur-xl bg-white/80 border border-white/30 
          hover:bg-white/95 transition-all duration-300 hover:shadow-lg 
          cursor-pointer rounded-xl"
        onClick={() => setSelectedEmployee(employee)}
      >
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-tr from-blue-100 to-purple-100">
                <img
                  src={employee.imageUrl}
                  alt={employee.name}
                  className="w-full h-full object-cover transition-transform duration-300
                    group-hover:scale-105"
                />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                {employee.name}
              </h3>
              <p className="text-sm text-gray-600">{employee.role}</p>
              <div className="flex items-center mt-2 space-x-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                  {employee.department}
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                  {employee.location}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-8 shadow-sm border border-white/50">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
              Annuaire des Employés
            </h1>
            
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 
                  ${searchFocused ? 'text-blue-500' : 'text-gray-400'}`} />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="w-full pl-10 h-11 rounded-lg border border-gray-200 
                    bg-white/80 focus:bg-white focus:ring-2 focus:ring-blue-500 
                    focus:border-transparent transition-all duration-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                />
              </div>
              
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="h-11">
                      <Filter className="w-4 h-4 mr-2" />
                      Département
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {departments.map(dept => (
                      <DropdownMenuItem 
                        key={dept}
                        onClick={() => setSelectedDepartment(dept)}
                      >
                        {dept === 'all' ? 'Tous les départements' : dept}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button 
                  variant="outline"
                  className="h-11"
                  onClick={() => setView(view === 'grid' ? 'list' : 'grid')}
                >
                  {view === 'grid' ? 'Liste' : 'Grille'}
                </Button>

                <Button 
                  variant="outline"
                  className="h-11"
                  onClick={handleExport}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Exporter
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Employee List */}
        {filteredEmployees.length > 0 ? (
          <div className={`grid gap-4 ${
            view === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredEmployees.map((employee, index) => (
              <EmployeeCard key={employee.id} employee={employee} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center p-8 bg-white/80 backdrop-blur-xl rounded-xl 
            border border-white/50 shadow-sm">
            <p className="text-gray-600">Aucun résultat trouvé</p>
            <p className="text-gray-500 text-sm mt-1">
              Essayez de modifier vos critères de recherche
            </p>
          </div>
        )}

        {/* Employee Details Modal */}
        <Dialog open={selectedEmployee !== null} onOpenChange={() => setSelectedEmployee(null)}>
          <DialogContent className="max-w-2xl bg-white rounded-xl p-0 overflow-hidden">
            {selectedEmployee && (
              <div>
                <div className="relative h-32 bg-gradient-to-r from-blue-500 to-purple-500">
                  <Button
                    variant="ghost"
                    className="absolute top-4 right-4 text-white hover:bg-white/20"
                    onClick={() => setSelectedEmployee(null)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="px-6 pb-6">
                  <div className="flex flex-col items-center -mt-16 mb-6">
                    <div className="relative">
                      <img
                        src={selectedEmployee.imageUrl}
                        alt={selectedEmployee.name}
                        className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
                      />
                    </div>
                    <h2 className="mt-4 text-2xl font-bold text-gray-900">
                      {selectedEmployee.name}
                    </h2>
                    <p className="text-blue-600 font-medium">{selectedEmployee.role}</p>
                  </div>

                  <div className="grid gap-4">
                    {[
                      { icon: Building2, label: "Département", value: selectedEmployee.department },
                      { icon: MapPin, label: "Localisation", value: selectedEmployee.location },
                      { icon: Phone, label: "Téléphone", value: selectedEmployee.phone },
                      { icon: Mail, label: "Email", value: selectedEmployee.email }
                    ].map(({ icon: Icon, label, value }) => (
                      <div key={label} className="flex items-center p-3 rounded-lg bg-gray-50">
                        <Icon className="w-5 h-5 text-gray-500 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">{label}</p>
                          <p className="text-gray-900">{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default EmployeeDirectory;