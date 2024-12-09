// styles/employeeDirectoryStyles.js

export const styles = {
  // Container Styles
  container: "min-h-screen bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-blue-50 via-white to-purple-100 p-6 relative overflow-hidden",
  backgroundPattern: "absolute inset-0 bg-grid-slate-200 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] opacity-50 animate-pulse -z-10",
  backgroundGradient: "absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,rgba(147,197,253,0.1),transparent)] -z-10",
  mainContent: "max-w-5xl mx-auto space-y-8",

  // Header Styles
  header: (isLoading) => `backdrop-blur-xl bg-white/60 rounded-3xl p-10 shadow-lg border border-white/30 transition-all duration-1000 ease-out transform ${
    isLoading ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
  }`,
  title: "text-6xl font-bold text-center bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-8 animate-fade-in bg-300% animate-gradient",
  searchContainer: (focused) => `relative max-w-2xl mx-auto transform transition-all duration-500 ${
    focused ? 'scale-105' : 'scale-100'
  }`,
  searchIcon: (focused) => `absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-all duration-300 ${
    focused ? 'text-blue-500' : ''
  }`,
  searchInput: "w-full pl-12 h-14 rounded-2xl border-0 bg-white/80 backdrop-blur-lg shadow-lg focus:ring-2 focus:ring-blue-400 focus:bg-white/95 transition-all duration-300 placeholder:text-gray-400 text-gray-700",

  // Employee Grid Styles
  employeeGrid: "grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  employeeCard: (isLoading, index) => ({
    wrapper: `transition-all duration-700 ease-out transform ${
      isLoading ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
    }`,
    card: "group backdrop-blur-xl bg-white/50 border border-white/30 hover:bg-white/70 transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-2 cursor-pointer rounded-2xl",
    content: "p-6",
    imageContainer: "relative",
    image: "w-20 h-20 rounded-full overflow-hidden transform group-hover:scale-110 transition-transform duration-500",
    imageGradient: "absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/20 to-purple-500/20 animate-pulse",
    infoContainer: "flex-1 transition-all duration-300 group-hover:translate-x-2",
    name: "font-semibold text-lg text-gray-800 group-hover:text-blue-600 transition-colors duration-300",
    role: "text-sm text-gray-600",
    department: "text-xs font-medium text-blue-600/80 mt-1"
  }),

  // No Results Styles
  noResults: "text-center p-10 backdrop-blur-xl bg-white/50 rounded-2xl border border-white/30 animate-fade-in shadow-lg",
  noResultsText: "text-gray-600 text-lg",
  noResultsSubText: "text-gray-500 text-sm mt-2",

  // Modal Styles
  modal: {
    content: "backdrop-blur-xl bg-white/95 border border-white/30 max-w-2xl rounded-3xl shadow-2xl transform transition-all duration-500",
    title: "text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent py-2",
    detailsContainer: "mt-8 space-y-8",
    imageSection: "flex flex-col items-center",
    imageWrapper: "relative w-36 h-36 mb-6",
    image: "w-full h-full rounded-full object-cover border-4 border-white shadow-2xl transition-transform duration-500 hover:scale-105",
    imageGradient: "absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/20 to-purple-500/20 animate-pulse",
    name: "text-2xl font-bold text-gray-800 mb-1",
    role: "text-blue-600 font-medium text-lg",
    detailsGrid: "grid gap-4",
    detailItem: "p-4 rounded-2xl bg-white/70 backdrop-blur-lg transition-all duration-300 hover:bg-white/90 hover:shadow-lg hover:translate-x-1 border border-white/50",
    detailContent: "flex items-center space-x-4",
    detailIcon: "w-5 h-5 text-blue-600",
    detailLabel: "font-medium text-gray-700",
    detailValue: "text-gray-600"
  }
};