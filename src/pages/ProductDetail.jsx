import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { ArrowLeft, Check, MessageCircle } from 'lucide-react';

const ProductDetail = () => {
    const { id } = useParams();
    const product = products.find(p => p.id === parseInt(id));

    if (!product) {
        return (
            <div className="section text-center">
                <div className="container">
                    <h2>Ürün bulunamadı.</h2>
                    <Link to="/products" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                        Ürünlere Dön
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="section">
            <div className="container">
                <Link to="/products" style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--color-text-light)', marginBottom: '2rem', fontWeight: '500' }}>
                    <ArrowLeft size={20} style={{ marginRight: '0.5rem' }} /> Tüm Ürünler
                </Link>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'start' }}>
                    {/* Image */}
                    <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
                        <img src={product.image} alt={product.name} style={{ width: '100%', height: 'auto', display: 'block' }} />
                    </div>

                    {/* Content */}
                    <div>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--color-primary)', marginBottom: '1rem' }}>{product.name}</h1>
                        <p style={{ fontSize: '1.25rem', color: 'var(--color-text-light)', marginBottom: '2rem', lineHeight: '1.6' }}>
                            {product.description}
                        </p>

                        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>Teknik Özellikler</h3>
                            <ul style={{ listStyle: 'none' }}>
                                {Object.entries(product.specs).map(([key, value]) => (
                                    <li key={key} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid #f1f5f9' }}>
                                        <span style={{ color: 'var(--color-text-light)', fontWeight: '500' }}>{key}</span>
                                        <span style={{ fontWeight: '600', color: 'var(--color-primary)' }}>{value}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <Link to="/contact" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem' }}>
                                <MessageCircle size={24} style={{ marginRight: '0.75rem' }} />
                                Fiyat Teklifi Al
                            </Link>
                            <div style={{ display: 'flex', gap: '1rem', color: 'var(--color-text-light)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                                <span style={{ display: 'flex', alignItems: 'center' }}><Check size={16} style={{ marginRight: '0.25rem', color: 'var(--color-accent)' }} /> Stokta Var</span>
                                <span style={{ display: 'flex', alignItems: 'center' }}><Check size={16} style={{ marginRight: '0.25rem', color: 'var(--color-accent)' }} /> 2 Yıl Garanti</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
