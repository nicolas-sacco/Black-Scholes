import React from 'react';

interface CallValueProps {
    value: number | null;
}

const CallValue: React.FC<CallValueProps> = ({ value }) => {
    return (
        <div className="call-value">
            <div className="box-title">CALL Value</div>
            <div className="box-value">${value?.toFixed(2) || '0.00'}</div>
        </div>
    );
}

export default CallValue;
