import React from 'react';

const DashboardCard = ({ title, count }) => {
    return (
        <div className="col-md-3">
            <div className="card bg-primary mb-3" style={{ color: 'purple' }}>
                <div className="card-header" style={{ color: 'purple' }}>{title}</div>
                <div className="card-body">
                    <h5 className="card-title" style={{ color: 'purple' }}>{count}</h5>
                </div>
            </div>
        </div>
    );
};

export default DashboardCard;
