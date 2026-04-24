import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, MapPin, Users, AlertCircle, BarChart3, Settings, Grid, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Sidebar.module.css';

const menuItems = [
  { icon: <LayoutDashboard size={20} />, label: 'Dashboard', href: '/dashboard' },
  { icon: <Package size={20} />, label: 'Demirbaşlar', href: '/dashboard/assets' },
  { icon: <Grid size={20} />, label: 'Kategoriler', href: '/dashboard/categories' },
  { icon: <MapPin size={20} />, label: 'Lokasyonlar', href: '/dashboard/locations' },
  { icon: <Users size={20} />, label: 'Zimmetler', href: '/dashboard/assignments' },
  { icon: <AlertCircle size={20} />, label: 'Arıza Talepleri', href: '/dashboard/requests' },
  { icon: <BarChart3 size={20} />, label: 'Raporlar', href: '/dashboard/reports' },
  { icon: <Settings size={20} />, label: 'Ayarlar', href: '/dashboard/settings' },
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const pathname = usePathname();

  return (
    <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>Y</div>
        {!isCollapsed && (
          <div className={styles.logoInfo}>
            <span className={styles.logoText}>YEŞİLAY</span>
            <span className={styles.logoSubtext}>İdari İşler DBYS</span>
          </div>
        )}
      </div>

      <button className={styles.toggleBtn} onClick={onToggle}>
        <Grid size={18} />
      </button>
      
      <nav className={styles.nav}>
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href} 
              className={`${styles.navLink} ${isActive ? styles.active : ''}`}
              title={isCollapsed ? item.label : ''}
            >
              {item.icon}
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
      
      <div className={styles.footer}>
        <div className={styles.user}>
          <div className={styles.avatar}>A</div>
          {!isCollapsed && (
            <div className={styles.userInfo}>
              <p className={styles.userName}>Admin User</p>
              <p className={styles.userRole}>Yönetici</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
