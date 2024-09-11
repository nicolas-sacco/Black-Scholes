import React from 'react';

interface PutValueProps {
    value: number | null;
}

const PutValue: React.FC<PutValueProps> = ({ value }) => {
    return (
        <div className="put-value">
            <div className="box-title">PUT Value</div>
            <div className="box-value">${value?.toFixed(2) || '0.00'}</div>
        </div>
    );
}

export default PutValue;
