'use client';

import React, { useState, useRef } from 'react';
import { X, Plus, Image as ImageIcon, Camera, Trash2 } from 'lucide-react';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import styles from './AddAssetModal.module.css';

interface AddAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddAssetModal: React.FC<AddAssetModalProps> = ({ isOpen, onClose }) => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const startCamera = async () => {
    setIsCameraOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Kamera erişimi engellendi:", err);
      setIsCameraOpen(false);
      alert("Kamera erişimi açılamadı. Lütfen izinleri kontrol edin.");
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        const dataUrl = canvasRef.current.toDataURL('image/jpeg');
        setPhoto(dataUrl);
        stopCamera();
      }
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    setIsCameraOpen(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={`${styles.modal} fade-in`} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3 className={styles.title}>Yeni Demirbaş Ekle</h3>
          <button className={styles.closeBtn} onClick={onClose}><X size={20} /></button>
        </div>
        
        <div className={styles.content}>
          <div className={styles.photoSection}>
            {photo ? (
              <div className={styles.photoPreview}>
                <img src={photo} alt="Asset" />
                <button className={styles.removePhoto} onClick={() => setPhoto(null)}><Trash2 size={16} /></button>
              </div>
            ) : isCameraOpen ? (
              <div className={styles.cameraContainer}>
                <video ref={videoRef} autoPlay playsInline className={styles.video} />
                <div className={styles.cameraActions}>
                    <Button size="sm" onClick={capturePhoto}>Çek</Button>
                    <Button size="sm" variant="outline" onClick={stopCamera}>İptal</Button>
                </div>
              </div>
            ) : (
              <div className={styles.photoOptions}>
                  <div className={styles.uploadBtn} onClick={() => fileInputRef.current?.click()}>
                    <ImageIcon size={24} />
                    <span>Fotoğraf Yükle</span>
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        style={{ display: 'none' }} 
                        accept="image/*" 
                        onChange={handleFileUpload}
                    />
                  </div>
                  <div className={styles.cameraBtn} onClick={startCamera}>
                    <Camera size={24} />
                    <span>Fotoğraf Çek</span>
                  </div>
              </div>
            )}
            <canvas ref={canvasRef} style={{ display: 'none' }} />
          </div>

          <div className={styles.formGrid}>
            <div className={styles.inputs}>
                <Input label="Demirbaş Adı" placeholder="Örn: Çalışma Masası L-Tipi" />
                <Input label="Kategori" placeholder="Mobilya, Dekorasyon vb." />
            </div>
            <Input label="Marka" placeholder="Örn: Nurus, Koleksiyon" />
            <Input label="Model" placeholder="Örn: Ergo-X Series" />
            <Input label="Seri Numarası" placeholder="SN-MOB-12345" />
            <Input label="Alım Tarihi" type="date" />
            <div className={styles.statusGroup}>
                <label className={styles.label}>Durum</label>
                <select className={styles.select}>
                    <option value="Aktif">Aktif</option>
                    <option value="Zimmetli">Zimmetli</option>
                    <option value="Arızalı">Arızalı</option>
                    <option value="Hurda">Hurda</option>
                </select>
            </div>
            <Input label="Konum / Birim" placeholder="Örn: Üsküdar YEDAM" />
          </div>
          <div className={styles.description}>
            <label className={styles.label}>Açıklama</label>
            <textarea className={styles.textarea} placeholder="Ek detaylar..."></textarea>
          </div>
        </div>

        <div className={styles.footer}>
          <Button variant="outline" onClick={onClose} className={styles.footerBtn}>İptal</Button>
          <Button onClick={onClose} className={styles.footerBtn}>
            <Plus size={18} />
            Demirbaş Kaydet
          </Button>
        </div>
      </div>
    </div>
  );
};
