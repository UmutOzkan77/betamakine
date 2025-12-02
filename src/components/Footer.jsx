import React from 'react';
import { Droplets, Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: 'var(--color-primary)', color: 'white', paddingTop: '4rem', paddingBottom: '2rem' }}>
            <div className="container">
                <div className="grid-cols-3" style={{ marginBottom: '3rem' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontSize: '1.25rem', fontWeight: 'bold' }}>
                            <Droplets style={{ color: 'var(--color-accent)' }} />
                            <span>Beta Oto Yıkama</span>
                        </div>
                        <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>
                            Profesyonel oto yıkama çözümleri ve yüksek performanslı pervaneler ile işletmenizin verimliliğini artırıyoruz.
                        </p>
                    </div>

                    <div>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Hızlı Bağlantılar</h3>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <li><Link to="/" style={{ color: '#cbd5e1' }}>Ana Sayfa</Link></li>
                            <li><Link to="/products" style={{ color: '#cbd5e1' }}>Ürünler</Link></li>
                            <li><Link to="/contact" style={{ color: '#cbd5e1' }}>İletişim</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>İletişim</h3>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#cbd5e1' }}>
                                <Phone size={18} />
                                <span>+90 212 555 00 00</span>
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#cbd5e1' }}>
                                <Mail size={18} />
                                <span>info@betaotoyikama.com</span>
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#cbd5e1' }}>
                                <MapPin size={18} />
                                <span>İkitelli OSB, İstanbul</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div style={{ borderTop: '1px solid #334155', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
                        &copy; {new Date().getFullYear()} Beta Oto Yıkama. Tüm hakları saklıdır.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <a href="#" style={{ color: '#94a3b8' }}><Facebook size={20} /></a>
                        <a href="#" style={{ color: '#94a3b8' }}><Instagram size={20} /></a>
                        <a href="#" style={{ color: '#94a3b8' }}><Linkedin size={20} /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
