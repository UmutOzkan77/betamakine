import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { ArrowRight } from 'lucide-react';

const Products = () => {
    return (
        <div className="section">
            <div className="container">
                <div className="text-center mb-8">
                    <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--color-primary)' }}>Ürünlerimiz</h1>
                    <p style={{ color: 'var(--color-text-light)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
                        İhtiyacınıza uygun yüksek kaliteli oto yıkama pervaneleri ve ekipmanları.
                    </p>
                </div>

                <div className="grid-cols-3" style={{ marginTop: '4rem' }}>
                    {products.map(product => (
                        <Link to={`/products/${product.id}`} key={product.id} style={{ display: 'block', textDecoration: 'none' }}>
                            <div style={{
                                backgroundColor: 'white',
                                borderRadius: 'var(--radius-lg)',
                                overflow: 'hidden',
                                boxShadow: 'var(--shadow-md)',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column'
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
                                <div style={{ height: '280px', overflow: 'hidden' }}>
                                    <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--color-primary)' }}>{product.name}</h3>
                                    <p style={{ color: 'var(--color-text-light)', marginBottom: '1.5rem', flex: 1 }}>{product.shortDesc}</p>

                                    <div style={{ marginTop: 'auto' }}>
                                        <span className="btn btn-outline" style={{ width: '100%' }}>
                                            İncele <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Products;
