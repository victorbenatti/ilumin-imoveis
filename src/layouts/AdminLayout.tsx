import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { Home, LogOut, Menu, X, PlusCircle } from 'lucide-react'
import { useState } from 'react'

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const navigate = useNavigate()

  const navItems = [
    { icon: Home, label: 'Meus Imóveis', path: '/admin/imoveis', end: true },
    { icon: PlusCircle, label: 'Adicionar Imóvel', path: '/admin/imoveis/novo', end: true },
  ]

  return (
    <div className="flex items-start bg-bg-dark min-h-screen text-text-primary">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-bg-section border-r border-border transform transition-transform duration-200 ease-in-out md:translate-x-0 md:static ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Logo Area */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-border">
            <img src="/logoIluminImoveisSVG-Branca.svg" alt="Ilumin Imóveis" className="h-8" />
            <button 
              className="p-1 md:hidden text-text-muted hover:text-text-primary hover:bg-bg-card rounded-md transition-colors"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'text-text-muted hover:bg-bg-card hover:text-text-primary'
                  }`
                }
                onClick={() => setIsSidebarOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Bottom Area */}
          <div className="p-4 border-t border-border">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center w-full gap-3 px-3 py-2.5 text-sm font-medium text-text-muted rounded-lg hover:bg-bg-card hover:text-primary transition-colors cursor-pointer"
            >
              <LogOut className="w-5 h-5" />
              Sair
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header */}
        <header className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8 bg-bg-section border-b border-border">
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 -ml-2 mr-2 text-text-muted hover:bg-bg-card hover:text-text-primary rounded-md md:hidden transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-semibold text-text-primary hidden sm:block">Painel de Administração</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold border border-primary/20">
              A
            </div>
          </div>
        </header>

        {/* Page Content Viewport */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  )
}
