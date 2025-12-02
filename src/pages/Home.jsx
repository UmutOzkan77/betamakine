import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Zap, Shield } from 'lucide-react';
import { products } from '../data/products';

const Home = () => {
    const featuredProducts = products.slice(0, 3);

    return (
        <div>
            {/* Hero Section */}
            <section style={{
                position: 'relative',
                height: '80vh',
                display: 'flex',
                alignItems: 'center',
                color: 'white',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: 'url("https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=1920")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'brightness(0.4)'
                }}></div>

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ maxWidth: '600px' }} className="animate-fade-in">
                        <h1 style={{ fontSize: '3.5rem', fontWeight: '800', lineHeight: 1.2, marginBottom: '1.5rem' }}>
                            Profesyonel Oto Yıkama Çözümleri
                        </h1>
                        <p style={{ fontSize: '1.25rem', marginBottom: '2rem', color: '#e2e8f0' }}>
                            Yüksek performanslı pervaneler ve endüstriyel yıkama ekipmanları ile işletmenizi bir adım öne taşıyın.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <Link to="/products" className="btn btn-primary">
                                Ürünleri İncele <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
                            </Link>
                            <Link to="/contact" className="btn" style={{ backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', color: 'white' }}>
                                İletişime Geç
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="section" style={{ backgroundColor: 'white' }}>
                <div className="container">
                    <div className="text-center mb-8">
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--color-primary)' }}>Neden Beta?</h2>
                        <p style={{ color: 'var(--color-text-light)', maxWidth: '600px', margin: '0 auto' }}>
                            Sektördeki 10 yılı aşkın tecrübemizle, en dayanıklı ve verimli çözümleri sunuyoruz.
                        </p>
                    </div>

                    <div className="grid-cols-3" style={{ marginTop: '3rem' }}>
                        <div style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--color-bg)', textAlign: 'center' }}>
                            <div style={{ width: '60px', height: '60px', backgroundColor: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--color-accent)' }}>
                                <Zap size={32} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Yüksek Performans</h3>
                            <p style={{ color: 'var(--color-text-light)' }}>Maksimum hava akışı ve basınç sağlayan aerodinamik tasarımlar.</p>
                        </div>
                        <div style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--color-bg)', textAlign: 'center' }}>
                            <div style={{ width: '60px', height: '60px', backgroundColor: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--color-accent)' }}>
                                <Shield size={32} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Uzun Ömürlü</h3>
                            <p style={{ color: 'var(--color-text-light)' }}>Korozyona dayanıklı malzemeler ve sağlam gövde yapısı.</p>
                        </div>
                        <div style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--color-bg)', textAlign: 'center' }}>
                            <div style={{ width: '60px', height: '60px', backgroundColor: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--color-accent)' }}>
                                <CheckCircle size={32} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Garantili Ürünler</h3>
                            <p style={{ color: 'var(--color-text-light)' }}>Tüm ürünlerimiz üretim hatalarına karşı tam garanti kapsamındadır.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="section" style={{ backgroundColor: 'var(--color-bg)' }}>
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '3rem' }}>
                        <div>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--color-primary)' }}>Öne Çıkan Ürünler</h2>
                            <p style={{ color: 'var(--color-text-light)' }}>En çok tercih edilen modellerimiz.</p>
                        </div>
                        <Link to="/products" style={{ color: 'var(--color-accent)', fontWeight: '600', display: 'flex', alignItems: 'center' }}>
                            Tümünü Gör <ArrowRight size={16} style={{ marginLeft: '0.5rem' }} />
                        </Link>
                    </div>

                    <div className="grid-cols-3">
                        {featuredProducts.map(product => (
                            <Link to={`/products/${product.id}`} key={product.id} style={{ display: 'block', textDecoration: 'none' }}>
                                <div style={{
                                    backgroundColor: 'white',
                                    borderRadius: 'var(--radius-lg)',
                                    overflow: 'hidden',
                                    boxShadow: 'var(--shadow-md)',
                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                    height: '100%'
                                }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-5px)';
                                        e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                                    }}
                                >
                                    <div style={{ height: '240px', overflow: 'hidden' }}>
                                        <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div style={{ padding: '1.5rem' }}>
                                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--color-primary)' }}>{product.name}</h3>
                                        <p style={{ color: 'var(--color-text-light)', fontSize: '0.9rem', marginBottom: '1rem' }}>{product.shortDesc}</p>
                                        <span style={{ color: 'var(--color-accent)', fontWeight: '600', fontSize: '0.9rem' }}>Detayları İncele &rarr;</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
