import React from 'react';
import { BsGraphUp } from 'react-icons/bs';

const StatsCard = ({ stat }) => {
    return (
        <div style={{
            background: 'white', border: '1px solid #ddd', borderRadius: '12px', padding: '24px',
            display: 'flex', flexDirection: 'column', gap: '8px'
        }}>
            <span style={{ fontSize: '14px', color: '#717171' }}>{stat.label}</span>
            <span style={{ fontSize: '32px', fontWeight: '700' }}>{stat.value}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: '#047857' }}>
                <BsGraphUp /> {stat.trend}
            </div>
        </div>
    );
};

export default StatsCard;
