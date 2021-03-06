import React, { Fragment } from 'react';
import Chart from 'react-google-charts';

const AdminDashboardOverviewChart = ({ campaigns }) => {
  const totalCampaigns = campaigns.length;
  const activeCampaigns = campaigns.filter(
    (campaign) => campaign.status === 'approved'
  ).length;
  const pendingCampaigns = campaigns.filter(
    (campaign) => campaign.status === 'pending'
  ).length;
  const rejectedCampaigns = campaigns.filter(
    (campaign) => campaign.status === 'rejected'
  ).length;

  const data = [
    ['Campaign', 'Total', { role: 'style' }],
    ['Active', activeCampaigns, 'silver'], // English color name
    ['Pending', pendingCampaigns, 'gold'],
    ['Rejected', rejectedCampaigns, 'color: #e5e4e2'], // CSS-style declaration,
    ['Campaigns', totalCampaigns, '#b87333'], // RGB value
  ];

  return (
    <Fragment>
      <Chart chartType='ColumnChart' width='100%' height='400px' data={data} />
    </Fragment>
  );
};

export default AdminDashboardOverviewChart;
