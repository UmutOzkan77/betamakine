import React from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

const Contact = () => {
    return (
        <div className="section">
            <div className="container">
                <div className="text-center mb-8">
                    <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--color-primary)' }}>İletişime Geçin</h1>
                    <p style={{ color: 'var(--color-text-light)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
                        Sorularınız ve fiyat teklifleri için bize ulaşın. Ekibimiz en kısa sürede size dönüş yapacaktır.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', marginTop: '4rem' }}>
                    {/* Contact Info */}
                    <div>
                        <div style={{ marginBottom: '3rem' }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', color: 'var(--color-primary)' }}>İletişim Bilgileri</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <div style={{ width: '50px', height: '50px', backgroundColor: '#e0f2fe', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent)', flexShrink: 0 }}>
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h4 style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Telefon</h4>
                                        <p style={{ color: 'var(--color-text-light)' }}>+90 212 555 00 00</p>
                                        <p style={{ color: 'var(--color-text-light)' }}>+90 532 555 00 00</p>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <div style={{ width: '50px', height: '50px', backgroundColor: '#e0f2fe', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent)', flexShrink: 0 }}>
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h4 style={{ fontWeight: '600', marginBottom: '0.25rem' }}>E-posta</h4>
                                        <p style={{ color: 'var(--color-text-light)' }}>info@betaotoyikama.com</p>
                                        <p style={{ color: 'var(--color-text-light)' }}>satis@betaotoyikama.com</p>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <div style={{ width: '50px', height: '50px', backgroundColor: '#e0f2fe', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent)', flexShrink: 0 }}>
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h4 style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Adres</h4>
                                        <p style={{ color: 'var(--color-text-light)' }}>
                                            İkitelli Organize Sanayi Bölgesi,<br />
                                            Metal İşleri Sanayi Sitesi, 12. Blok No: 5<br />
                                            Başakşehir / İstanbul
                                        </p>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <div style={{ width: '50px', height: '50px', backgroundColor: '#e0f2fe', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent)', flexShrink: 0 }}>
                                        <Clock size={24} />
                                    </div>
                                    <div>
                                        <h4 style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Çalışma Saatleri</h4>
                                        <p style={{ color: 'var(--color-text-light)' }}>Pazartesi - Cuma: 08:30 - 18:00</p>
                                        <p style={{ color: 'var(--color-text-light)' }}>Cumartesi: 09:00 - 14:00</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div style={{ backgroundColor: 'white', padding: '2.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', color: 'var(--color-primary)' }}>Bize Yazın</h3>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--color-text)' }}>Adınız Soyadınız</label>
                                <input type="text" placeholder="Adınız Soyadınız" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', outline: 'none', transition: 'border-color 0.2s' }} />
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--color-text)' }}>E-posta Adresiniz</label>
                                <input type="email" placeholder="ornek@mail.com" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', outline: 'none', transition: 'border-color 0.2s' }} />
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--color-text)' }}>Konu</label>
                                <select style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', outline: 'none', backgroundColor: 'white' }}>
                                    <option>Genel Bilgi</option>
                                    <option>Fiyat Teklifi</option>
                                    <option>Teknik Destek</option>
                                    <option>Diğer</option>
                                </select>
                            </div>
                            <div style={{ marginBottom: '2rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--color-text)' }}>Mesajınız</label>
                                <textarea rows="4" placeholder="Mesajınızı buraya yazın..." style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', outline: 'none', resize: 'vertical' }}></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                                Gönder <Send size={18} style={{ marginLeft: '0.5rem' }} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
