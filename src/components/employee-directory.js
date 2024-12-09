"use client"

import React, { useState } from 'react';
import { Search, Building2, MapPin, Phone, Mail, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { employees } from '@/data/employees';

const EmployeeDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    setIsLoading(false);
  }, []);

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          
          <div className="relative max-w-2xl mx-auto transform transition-all duration-300 hover:scale-[1.01]">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher par nom, département ou poste..."
              className="w-full pl-12 h-14 rounded-xl border-0 bg-white/70 backdrop-blur-sm shadow-lg focus:ring-2 focus:ring-purple-500 focus:bg-white/90 transition-all duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Grille des employés avec animation d'entrée */}
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

        {/* Message "Aucun résultat" avec animation */}
        {filteredEmployees.length === 0 && (
          <div className="col-span-full text-center p-8 backdrop-blur-md bg-white/40 rounded-xl border border-white/20 animate-fade-in">
            <p className="text-gray-500">Aucun résultat trouvé</p>
          </div>
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