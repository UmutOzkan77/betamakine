import React from 'react';
import { Shield, Users, Award, Target } from 'lucide-react';

const About = () => {
    return (
        <div>
            {/* Hero Section */}
            <section style={{
                backgroundColor: 'var(--color-primary)',
                color: 'white',
                padding: '5rem 0',
                textAlign: 'center'
            }}>
                <div className="container">
                    <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem' }}>Hakkımızda</h1>
                    <p style={{ fontSize: '1.25rem', color: '#cbd5e1', maxWidth: '700px', margin: '0 auto' }}>
                        Beta Oto Yıkama olarak, 2010 yılından beri oto yıkama sektörüne yenilikçi ve yüksek performanslı çözümler sunuyoruz.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="section">
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
                        <div>
                            <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1.5rem', color: 'var(--color-primary)' }}>Hikayemiz</h2>
                            <p style={{ color: 'var(--color-text-light)', marginBottom: '1rem', lineHeight: '1.7' }}>
                                Beta Oto Yıkama, küçük bir atölyede başlayan yolculuğunu bugün Türkiye'nin dört bir yanına hizmet veren dev bir operasyona dönüştürmüştür. Kurulduğumuz günden bu yana değişmeyen tek şey, kaliteye ve müşteri memnuniyetine olan bağlılığımızdır.
                            </p>
                            <p style={{ color: 'var(--color-text-light)', lineHeight: '1.7' }}>
                                Sektördeki eksiklikleri görerek geliştirdiğimiz patentli pervane tasarımlarımız, bugün yüzlerce oto yıkama istasyonunda güvenle kullanılmaktadır. Ar-Ge çalışmalarımıza yaptığımız yatırımlarla, her geçen gün daha verimli ve çevre dostu ürünler geliştirmeye devam ediyoruz.
                            </p>
                        </div>
                        <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
                            <img src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=800" alt="Beta Oto Yıkama Fabrika" style={{ width: '100%', height: 'auto', display: 'block' }} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="section" style={{ backgroundColor: 'var(--color-bg)' }}>
                <div className="container">
                    <div className="text-center mb-8">
                        <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--color-primary)' }}>Değerlerimiz</h2>
                    </div>

                    <div className="grid-cols-3">
                        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
                            <div style={{ width: '60px', height: '60px', backgroundColor: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--color-accent)' }}>
                                <Shield size={32} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Güvenilirlik</h3>
                            <p style={{ color: 'var(--color-text-light)' }}>Söz verdiğimiz kalitede ve zamanda teslimat yapıyoruz.</p>
                        </div>

                        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
                            <div style={{ width: '60px', height: '60px', backgroundColor: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--color-accent)' }}>
                                <Award size={32} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Kalite</h3>
                            <p style={{ color: 'var(--color-text-light)' }}>Üretimimizin her aşamasında en yüksek kalite standartlarını uyguluyoruz.</p>
                        </div>

                        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
                            <div style={{ width: '60px', height: '60px', backgroundColor: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--color-accent)' }}>
                                <Target size={32} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>İnovasyon</h3>
                            <p style={{ color: 'var(--color-text-light)' }}>Sürekli gelişim ve yenilikçi çözümler için çalışıyoruz.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
