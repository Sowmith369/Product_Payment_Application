import { Search, User, CalendarDays } from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-US', options);

  return (
    <header className="bg-white border-b px-4 py-3 flex flex-col sm:flex-row items-center justify-between sm:px-6 sm:py-4">
      <div className="flex items-center w-full sm:w-auto">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="flex items-center space-x-4 mt-3 sm:mt-0">
        <div className="flex items-center space-x-2">
          <CalendarDays className="w-6 h-6 text-gray-600" />
          <span className="text-gray-700 text-sm font-medium hidden sm:inline">{formattedDate}</span>
        </div>
        <div className="flex items-center space-x-2">
          <User className="w-8 h-8 rounded-full bg-gray-200 p-1 text-gray-600" />
          <span className="font-medium text-gray-700">Admin</span>
        </div>
      </div>
    </header>
  );
}