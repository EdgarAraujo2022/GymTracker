import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { MoreVertical } from 'lucide-react';

interface MenuItem {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  color?: string;
  divider?: boolean;
}

interface MenuDropdownProps {
  items: MenuItem[];
}

export const MenuDropdown = ({ items }: MenuDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fecha ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Atualiza posição ao scrollar
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setMenuPosition({
          top: rect.bottom + window.scrollY,
          left: rect.right - 192
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  const handleOpenMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + window.scrollY,
        left: rect.right - 192
      });
    }
    
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        ref={buttonRef}
        onClick={handleOpenMenu}
        className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors relative z-10"
        type="button"
      >
        <MoreVertical className="w-5 h-5 text-gray-600" />
      </button>

      {isOpen && createPortal(
        <div
          ref={menuRef}
          style={{
            position: 'absolute',
            top: menuPosition.top,
            left: menuPosition.left,
            zIndex: 99999
          }}
          className="w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-1"
          onClick={(e) => e.stopPropagation()}
        >
          {items.map((item, index) => (
            <div key={index}>
              {item.divider && index > 0 && (
                <div className="border-t border-gray-200 my-1" />
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  item.onClick();
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2 ${
                  item.color || 'text-gray-700'
                }`}
                type="button"
              >
                <span className="flex-shrink-0">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            </div>
          ))}
        </div>,
        document.body
      )}
    </>
  );
};