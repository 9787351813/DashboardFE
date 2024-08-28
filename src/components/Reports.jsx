import React from 'react';
import Manageemployees from './Manageemployees';
import Attendance from './Attendance';
import PerformanceEvaluation from './PerformanceEvaluation';
import RecruitmentProcess from './RecruitmentProcess';

const ReportAnalysis = () => {
  return (
    <div>
      <h1 style={{ textAlign: 'center', color: '#6a0dad' }}>HR Report and Analysis</h1>
      <Manageemployees />
      <Attendance />
      <PerformanceEvaluation />
      <RecruitmentProcess />
    </div>
  );
};

export default ReportAnalysis;
