"use client"

import React, { useState, useMemo } from 'react';
import { Search, Building2, MapPin, Phone, Mail, FolderTree, Users, Building } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { employees } from '@/data/employees';

// Composant pour le sélecteur d'affichage
const DirectorySelector = ({ activeDirectory, setActiveDirectory }) => (
  <div className="flex justify-center gap-4 mb-8">
    <DirectoryButton
      icon={<Users className="w-5 h-5" />}
      label="Annuaire"
      isActive={activeDirectory === 'employees'}
      onClick={() => setActiveDirectory('employees')}
    />
    <DirectoryButton
      icon={<FolderTree className="w-5 h-5" />}
      label="Arborescence"
      isActive={activeDirectory === 'tree'}
      onClick={() => setActiveDirectory('tree')}
    />
  </div>
);

// Composant pour les boutons du sélecteur
const DirectoryButton = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
      isActive ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </button>
);

// Composant pour la barre de recherche
const SearchInput = ({ icon: Icon, placeholder, value, onChange }) => (
  <div className="relative flex-1 transform transition-all duration-300 hover:scale-[1.01]">
    <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
    <input
      type="text"
      placeholder={placeholder}
      className="w-full pl-12 h-14 rounded-xl border-0 bg-white/70 backdrop-blur-sm shadow-lg focus:ring-2 focus:ring-purple-500 focus:bg-white/90 transition-all duration-300"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const EmployeeDirectory = () => {
  // États
  const [searchFirstName, setSearchFirstName] = useState('');
  const [searchLastName, setSearchLastName] = useState('');
  const [searchPhone, setSearchPhone] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeDirectory, setActiveDirectory] = useState('employees');
  const [searchDepartment, setSearchDepartment] = useState('');

  // Effet pour simuler le chargement
  React.useEffect(() => {
    setIsLoading(false);
  }, []);

  // Mémoisation des employés filtrés
  const filteredEmployees = useMemo(() => {
    return employees.filter(employee => {
      const [firstName, lastName] = employee.name.split(' ');
      return (
        firstName.toLowerCase().includes(searchFirstName.toLowerCase()) &&
        lastName.toLowerCase().includes(searchLastName.toLowerCase()) &&
        employee.phone.includes(searchPhone) &&
        employee.department.toLowerCase().includes(searchDepartment.toLowerCase())
      );
    });
  }, [searchFirstName, searchLastName, searchPhone, searchDepartment]);

  const isSearching = searchFirstName !== '' || searchLastName !== '' || searchPhone !== '' || searchDepartment !== '';

  const DirectorySelector = () => (
    <div className="flex justify-center gap-4 mb-8">
      <button
        onClick={() => setActiveDirectory('employees')}
        className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
          activeDirectory === 'employees'
            ? 'bg-blue-100 text-blue-600'
            : 'hover:bg-gray-100'
        }`}
      >
        <Users className="w-5 h-5" />
        <span className="font-medium">Annuaire</span>
      </button>
      <button
        onClick={() => setActiveDirectory('tree')}
        className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
          activeDirectory === 'tree'
            ? 'bg-blue-100 text-blue-600'
            : 'hover:bg-gray-100'
        }`}
      >
        <FolderTree className="w-5 h-5" />
        <span className="font-medium">Arborescence</span>
      </button>
    </div>
  );

  const OrganizationTree = ({ employees }) => {
    const departmentGroups = employees.reduce((acc, emp) => {
      if (!acc[emp.department]) {
        acc[emp.department] = [];
      }
      acc[emp.department].push(emp);
      return acc;
    }, {});

    return (
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-sm border border-white/50">
        <div className="space-y-4">
          {Object.entries(departmentGroups).map(([department, departmentEmployees]) => (
            <div key={department} className="space-y-2">
              <div className="flex items-center gap-2 font-medium text-gray-900">
                <Building className="w-5 h-5 text-blue-600" />
                <span>{department}</span>
                <span className="text-sm text-gray-500">
                  ({departmentEmployees.length})
                </span>
              </div>
              <div className="ml-6 pl-4 border-l-2 border-gray-200 space-y-2">
                {departmentEmployees.map((emp) => (
                  <div
                    key={emp.id}
                    className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                    onClick={() => setSelectedEmployee(emp)}
                  >
                    <img
                      src={emp.imageUrl}
                      alt={emp.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-sm font-medium">{emp.name}</div>
                      <div className="text-xs text-gray-500">{emp.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6 relative overflow-hidden">
      {/* Motif de fond */}
      <div className="absolute inset-0 bg-grid-slate-200 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
      
      <div className="max-w-4xl mx-auto space-y-8">
        {/* En-tête avec animation d'entrée */}
        <div 
          className={`backdrop-blur-md bg-white/40 rounded-2xl p-8 shadow-lg border border-white/20 transition-all duration-700 ease-out ${
            isLoading ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}
        >
          <h1 className="text-5xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8 animate-fade-in">
            Qui&Où
          </h1>
          
          <DirectorySelector activeDirectory={activeDirectory} setActiveDirectory={setActiveDirectory} />

          <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1 transform transition-all duration-300 hover:scale-[1.01]">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Prénom..."
                className="w-full pl-12 h-14 rounded-xl border-0 bg-white/70 backdrop-blur-sm shadow-lg focus:ring-2 focus:ring-purple-500 focus:bg-white/90 transition-all duration-300"
                value={searchFirstName}
                onChange={(e) => setSearchFirstName(e.target.value)}
              />
            </div>
            
            <div className="relative flex-1 transform transition-all duration-300 hover:scale-[1.01]">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Nom..."
                className="w-full pl-12 h-14 rounded-xl border-0 bg-white/70 backdrop-blur-sm shadow-lg focus:ring-2 focus:ring-purple-500 focus:bg-white/90 transition-all duration-300"
                value={searchLastName}
                onChange={(e) => setSearchLastName(e.target.value)}
              />
            </div>

            <div className="relative flex-1 transform transition-all duration-300 hover:scale-[1.01]">
              <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Département..."
                className="w-full pl-12 h-14 rounded-xl border-0 bg-white/70 backdrop-blur-sm shadow-lg focus:ring-2 focus:ring-purple-500 focus:bg-white/90 transition-all duration-300"
                value={searchDepartment}
                onChange={(e) => setSearchDepartment(e.target.value)}
              />
            </div>

            <div className="relative flex-1 transform transition-all duration-300 hover:scale-[1.01]">
              <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Téléphone..."
                className="w-full pl-12 h-14 rounded-xl border-0 bg-white/70 backdrop-blur-sm shadow-lg focus:ring-2 focus:ring-purple-500 focus:bg-white/90 transition-all duration-300"
                value={searchPhone}
                onChange={(e) => setSearchPhone(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Conditional rendering based on activeDirectory and search status */}
        {activeDirectory === 'employees' && isSearching ? (
            <>
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {filteredEmployees.map((employee, index) => (
                        <div
                            key={employee.id}
                            className={`transition-all duration-700 ease-out ${
                                isLoading ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                            }`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <Card 
                                className="cursor-pointer group backdrop-blur-md bg-white/40 border border-white/20 hover:bg-white/60 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
                                onClick={() => setSelectedEmployee(employee)}
                            >
                                <CardContent className="p-6">
                                    <div className="flex items-center space-x-4">
                                        <div className="relative">
                                            <div className="w-20 h-20 rounded-full overflow-hidden transform group-hover:scale-105 transition-transform duration-300">
                                                <img
                                                    src={employee.imageUrl}
                                                    alt={employee.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/20 to-purple-500/20 animate-pulse" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-lg text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                                                {employee.name}
                                            </h3>
                                            <p className="text-sm text-gray-600">{employee.role}</p>
                                            <p className="text-xs font-medium text-blue-600/80 mt-1">{employee.department}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>

                {/* Message "Aucun résultat" uniquement si une recherche est active */}
                {filteredEmployees.length === 0 && (
                    <div className="col-span-full text-center p-8 backdrop-blur-md bg-white/40 rounded-xl border border-white/20 animate-fade-in">
                        <p className="text-gray-500">Aucun résultat trouvé</p>
                    </div>
                )}
            </>
        ) : (
            activeDirectory === 'tree' && <OrganizationTree employees={filteredEmployees} />
        )}

        {/* Modal des détails avec animations */}
        <Dialog open={selectedEmployee !== null} onOpenChange={() => setSelectedEmployee(null)}>
          <DialogContent className="backdrop-blur-md bg-white/90 border border-white/20 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Détails de l'employé
              </DialogTitle>
            </DialogHeader>
            
            {selectedEmployee && (
              <div className="mt-6 space-y-6">
                <div className="flex flex-col items-center">
                  <div className="relative w-32 h-32 mb-4">
                    <img
                      src={selectedEmployee.imageUrl}
                      alt={selectedEmployee.name}
                      className="w-full h-full rounded-full object-cover border-4 border-white shadow-xl"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/20 to-purple-500/20 animate-pulse" />
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-800">{selectedEmployee.name}</h2>
                  <p className="text-blue-600 font-medium">{selectedEmployee.role}</p>
                </div>
                
                <div className="grid gap-4">
                  <div className="p-4 rounded-xl bg-white/50 backdrop-blur-sm transition-all duration-300 hover:bg-white/70">
                    <div className="flex items-center space-x-3">
                      <Building2 className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-700">Département</p>
                        <p className="text-gray-600">{selectedEmployee.department}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-white/50 backdrop-blur-sm transition-all duration-300 hover:bg-white/70">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-700">Localisation</p>
                        <p className="text-gray-600">{selectedEmployee.location}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-white/50 backdrop-blur-sm transition-all duration-300 hover:bg-white/70">
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-700">Téléphone</p>
                        <p className="text-gray-600">{selectedEmployee.phone}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-white/50 backdrop-blur-sm transition-all duration-300 hover:bg-white/70">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-700">Email</p>
                        <p className="text-gray-600">{selectedEmployee.email}</p>
                      </div>
                    </div>
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