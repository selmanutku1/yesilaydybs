import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Lock, Mail } from 'lucide-react';
import styles from './Login.module.css';

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <div className={`${styles.loginCard} card fade-in`}>
        <div className={styles.header}>
          <div className={styles.logo}>Y</div>
          <h1 className={styles.title}>Giriş Yap</h1>
          <p className={styles.subtitle}>Demirbaş Yönetim Sistemi'ne erişmek için bilgilerinizi girin.</p>
        </div>

        <form className={styles.form}>
          <Input 
            label="E-posta" 
            placeholder="admin@yesilay.org.tr" 
            icon={<Mail size={18} />} 
          />
          <Input 
            label="Şifre" 
            type="password" 
            placeholder="••••••••" 
            icon={<Lock size={18} />} 
          />
          
          <div className={styles.options}>
            <label className={styles.remember}>
              <input type="checkbox" />
              <span>Beni Hatırla</span>
            </label>
            <a href="#" className={styles.forgot}>Şifremi Unuttum</a>
          </div>

          <Button className={styles.submitBtn}>Giriş Yap</Button>
          
          <div className={styles.divider}>
            <span>veya</span>
          </div>

          <Button 
            variant="outline" 
            className={styles.quickLoginBtn} 
            onClick={() => window.location.href = '/dashboard'}
          >
            Hızlı Giriş (Demo)
          </Button>
        </form>
      </div>
    </div>
  );
}
