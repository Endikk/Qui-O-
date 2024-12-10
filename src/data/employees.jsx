// src/data/employees.js
export const employees = [
    {
      id: 1,
      name: "Marie Dubois",
      department: "Direction Commerciale",
      role: "Directrice Commerciale",
      location: "Paris - 3ème étage",
      phone: "01 23 45 67 89",
      email: "m.dubois@entreprise.fr",
      imageUrl: "https://edgard-lelegant.com/wp-content/uploads/2021/07/Les-20-plus-belles-femmes-du-monde-Emma-Watson.jpeg"
    },
    {
      id: 2,
      name: "Thomas Martin",
      department: "Marketing Digital",
      role: "Chef de Projet SEO",
      location: "Lyon - Open Space",
      phone: "01 23 45 67 90",
      email: "t.martin@entreprise.fr",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/dc/Thomas_Pesquet%2C_official_portrait_in_EMU_%282020%29_cropped.jpg"
    },
    {
      id: 3,
      name: "Lucas Labonde",
      department: "DEV Digital",
      role: "Alternant Dev & Data",
      location: "Rouen - Siège NatUp",
      phone: "05 65 85 47 58",
      email: "lucas.labonde@entreprise.fr",
      imageUrl: "https://sportal.fr/wp-content/uploads/2023/05/charles-leclerc_12039411190x786.jpg"
    },
    {
      id: 4,
      name: "Sophie Lefevre",
      department: "Ressources Humaines",
      role: "Responsable RH",
      location: "Lille - 1er étage",
      phone: "01 23 45 67 91",
      email: "",
      imageUrl: "https://media.vanityfair.fr/photos/60d36ad15c31ba5381d77401/16:9/w_2560%2Cc_limit/vf_sophie_marceau_opg_8032.jpeg"
    },
    {
      id: 5,
      name: "Jean Dupont",
      department: "Direction Financière",
      role: "Comptable",
      location: "Paris - 2ème étage",
      phone: "01 23 45 67 92",
      email: "",
      imageUrl: "https://www.ouest-france.fr/sites/default/files/styles/image-640x360/public/2021/06/25/jean-dujardin-est-a-l-affiche-de-la-nouvelle-serie-de-france-2-jean-louis.jpg"
    },
    {
      id: 6,
      name: "Marie Dupont",
      department: "Direction Financière",
      role: "Contrôleur de Gestion",
      location: "Paris - 2ème étage",
      phone: "01 23 45 67 93",
      email: "",
      imageUrl: "https://www.ouest-france.fr/sites/default/files/styles/image-640x360/public/2021/06/25/jean-dujardin-est-a-l-affiche-de-la-nouvelle-serie-de-france-2-jean-louis.jpg"
    },
    {
      id: 7,
      name: "Jeanne Dupont",
      department: "Direction Financière",
      role: "Responsable Comptable",
      location: "Paris - 2ème étage",
      phone: "01 23 45 67 94",
      email: "",
      imageUrl: "https://www.ouest-france.fr/sites/default/files/styles/image-640x360/public/2021/06/25/jean-dujardin-est-a-l-affiche-de-la-nouvelle-serie-de-france-2-jean-louis.jpg"
    },
    {
      id: 8,
      name: "Marie Lefevre",
      department: "Ressources Humaines",
      role: "Chargée de Recrutement",
      location: "Lille - 1er étage",
      phone: "01 23 45 67 95",
      email: "",
      imageUrl: "https://media.vanityfair.fr/photos/60d36ad15c31ba5381d77401/16:9/w_2560%2Cc_limit/vf_sophie_marceau_opg_8032.jpeg"
    },
    {
      id: 9,
      name: "Jeanne Lefevre",
      department: "Ressources Humaines",
      role: "Responsable Formation",
      location: "Lille - 1er étage",
      phone: "01 23 45 67 96",
      email: "",
      imageUrl: "https://media.vanityfair.fr/photos/60d36ad15c31ba5381d77401/16:9/w_2560%2Cc_limit/vf_sophie_marceau_opg_8032.jpeg"
    },
    {
      id: 10,
      name: "Jean Martin",
      department: "Marketing Digital",
      role: "Chef de Projet SEA",
      location: "Lyon - Open Space",
      phone: "01 23 45 67 97",
      email: "",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/dc/Thomas_Pesquet%2C_official_portrait_in_EMU_%282020%29_cropped.jpg"
    },
    {
      id: 11,
      name: "Thomas Dubois",
      department: "Direction Commerciale",
      role: "Commercial",
      location: "Paris - 3ème étage",
      phone: "01 23 45 67 98",
      email: "",
      imageUrl: "https://edgard-lelegant.com/wp-content/uploads/2021/07/Les-20-plus-belles-femmes-du-monde-Emma-Watson.jpeg"
    },
    // Vous pouvez ajouter plus d'employés ici
  ];

  export const Site = [
  {
    id: 1,
    name: "Paris",
    address: "123 Avenue des Champs-Élysées",
    postalCode: "75008"
  },
  {
    id: 2, 
    name: "Lyon",
    address: "45 Rue de la République",
    postalCode: "69001"
  },
  {
    id: 3,
    name: "Marseille",
    address: "92 La Canebière",
    postalCode: "13001"
  },
  {
    id: 4,
    name: "Bordeaux",
    address: "15 Cours de l'Intendance",
    postalCode: "33000"
  },
  {
    id: 5,
    name: "Lille",
    address: "67 Rue de Béthune",
    postalCode: "59000"
  },
  {
    id: 6,
    name: "Toulouse",
    address: "23 Rue d'Alsace-Lorraine",
    postalCode: "31000"
  },
  {
    id: 7,
    name: "Nantes",
    address: "4 Place du Commerce",
    postalCode: "44000"
  },
  {
    id: 8,
    name: "Strasbourg",
    address: "12 Place Kléber",
    postalCode: "67000"
  }
  ]

// Fonction pour extraire les départements uniques
export const getUniqueDepartments = () => {
  const departments = employees.map(employee => employee.department);
  return [...new Set(departments)];
};