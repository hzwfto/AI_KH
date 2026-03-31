export type AssessmentStatus = 'pending' | 'in-progress' | 'completed';

export interface Assessment {
  id: string;
  title: string;
  category: string;
  status: AssessmentStatus;
  dueDate: string;
  score?: number;
  evaluator?: string;
  description: string;
  attempts: number;
  maxAttempts: number;
}

export const getMockAssessments = (lang: 'en' | 'zh'): Assessment[] => {
  if (lang === 'zh') {
    return [
      {
        id: 'A001',
        title: '标准客房清洁流程',
        category: '客房服务',
        status: 'completed',
        dueDate: '2026-03-15',
        score: 92,
        evaluator: '王经理 (主管)',
        description: '按照酒店检查表在30分钟内完成标准双人房的全面清洁。',
        attempts: 1,
        maxAttempts: 2,
      },
      {
        id: 'A002',
        title: '客人入住与冲突解决',
        category: '前台',
        status: 'completed',
        dueDate: '2026-03-20',
        score: 85,
        evaluator: '李总监 (经理)',
        description: '模拟客人入住流程，并处理关于房间降级的投诉。',
        attempts: 2,
        maxAttempts: 2,
      },
      {
        id: 'A003',
        title: '高级餐厅葡萄酒服务',
        category: '餐饮',
        status: 'pending',
        dueDate: '2026-04-05',
        description: '在餐桌旁演示红酒的正确展示、开瓶和倒酒。',
        attempts: 0,
        maxAttempts: 3,
      },
      {
        id: 'A004',
        title: '紧急疏散演练',
        category: '安全保卫',
        status: 'in-progress',
        dueDate: '2026-04-10',
        description: '参与模拟火灾报警，并引导客人前往指定的集合点。',
        attempts: 1,
        maxAttempts: 2,
      },
      {
        id: 'A005',
        title: 'VIP客房布置',
        category: '客房服务',
        status: 'pending',
        dueDate: '2026-04-15',
        description: '为VIP客人准备套房，包括欢迎礼品和特定偏好布置。',
        attempts: 0,
        maxAttempts: 1,
      }
    ];
  }
  return [
    {
      id: 'A001',
      title: 'Standard Room Cleaning Procedure',
      category: 'Housekeeping',
      status: 'completed',
      dueDate: '2026-03-15',
      score: 92,
      evaluator: 'Jane Smith (Supervisor)',
      description: 'Complete a full cleaning of a standard double room within 30 minutes following the hotel checklist.',
      attempts: 1,
      maxAttempts: 2,
    },
    {
      id: 'A002',
      title: 'Guest Check-in & Conflict Resolution',
      category: 'Front Desk',
      status: 'completed',
      dueDate: '2026-03-20',
      score: 85,
      evaluator: 'Michael Johnson (Manager)',
      description: 'Simulate a guest check-in process and handle a complaint regarding a room downgrade.',
      attempts: 2,
      maxAttempts: 2,
    },
    {
      id: 'A003',
      title: 'Fine Dining Wine Service',
      category: 'Food & Beverage',
      status: 'pending',
      dueDate: '2026-04-05',
      description: 'Demonstrate proper presentation, opening, and pouring of a bottle of red wine at a table.',
      attempts: 0,
      maxAttempts: 3,
    },
    {
      id: 'A004',
      title: 'Emergency Evacuation Protocol',
      category: 'Safety & Security',
      status: 'in-progress',
      dueDate: '2026-04-10',
      description: 'Participate in a simulated fire alarm and guide guests to the designated assembly point.',
      attempts: 1,
      maxAttempts: 2,
    },
    {
      id: 'A005',
      title: 'VIP Room Setup',
      category: 'Housekeeping',
      status: 'pending',
      dueDate: '2026-04-15',
      description: 'Prepare a suite for a VIP guest including welcome amenities and specific preferences.',
      attempts: 0,
      maxAttempts: 1,
    }
  ];
};

export const getPerformanceData = (lang: 'en' | 'zh') => {
  const monthsEn = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
  const monthsZh = ['10月', '11月', '12月', '1月', '2月', '3月'];
  const months = lang === 'zh' ? monthsZh : monthsEn;
  
  return [
    { month: months[0], score: 78 },
    { month: months[1], score: 82 },
    { month: months[2], score: 80 },
    { month: months[3], score: 85 },
    { month: months[4], score: 88 },
    { month: months[5], score: 88.5 },
  ];
};

export const getSkillData = (lang: 'en' | 'zh') => {
  if (lang === 'zh') {
    return [
      { subject: '沟通能力', A: 90, fullMark: 100 },
      { subject: '工作效率', A: 85, fullMark: 100 },
      { subject: '解决问题', A: 80, fullMark: 100 },
      { subject: '流程规范', A: 95, fullMark: 100 },
      { subject: '客户服务', A: 88, fullMark: 100 },
    ];
  }
  return [
    { subject: 'Communication', A: 90, fullMark: 100 },
    { subject: 'Efficiency', A: 85, fullMark: 100 },
    { subject: 'Problem Solving', A: 80, fullMark: 100 },
    { subject: 'Procedure Adherence', A: 95, fullMark: 100 },
    { subject: 'Customer Service', A: 88, fullMark: 100 },
  ];
};

export const getImprovementSuggestions = (lang: 'en' | 'zh') => {
  if (lang === 'zh') {
    return [
      {
        subject: '解决问题',
        score: 80,
        suggestion: '在遇到突发客诉时，建议多参考《标准应急处理SOP》，并主动向上级寻求支持，减少处理时间。'
      },
      {
        subject: '工作效率',
        score: 85,
        suggestion: '客房清洁时间略微超出标准。建议优化清洁动线，优先处理耗时较长的卫浴区域。'
      }
    ];
  }
  return [
    {
      subject: 'Problem Solving',
      score: 80,
      suggestion: 'When encountering unexpected guest complaints, refer to the Standard Emergency SOP more often and proactively seek support from supervisors to reduce resolution time.'
    },
    {
      subject: 'Efficiency',
      score: 85,
      suggestion: 'Room cleaning time slightly exceeded the standard. Consider optimizing your cleaning route, prioritizing the time-consuming bathroom area.'
    }
  ];
};

export const getDetailedStats = (lang: 'en' | 'zh') => {
  if (lang === 'zh') {
    return {
      totalAssessments: 12,
      passed: 10,
      failed: 2,
      passRate: 83,
      averageScore: 86.5,
      averageAttempts: 1.4,
      categoryPerformance: [
        { category: '客房服务', score: 88, count: 5 },
        { category: '前台', score: 92, count: 3 },
        { category: '餐饮', score: 78, count: 2 },
        { category: '安全保卫', score: 95, count: 2 },
      ]
    };
  }
  return {
    totalAssessments: 12,
    passed: 10,
    failed: 2,
    passRate: 83,
    averageScore: 86.5,
    averageAttempts: 1.4,
    categoryPerformance: [
      { category: 'Housekeeping', score: 88, count: 5 },
      { category: 'Front Desk', score: 92, count: 3 },
      { category: 'F&B', score: 78, count: 2 },
      { category: 'Security', score: 95, count: 2 },
    ]
  };
};

export const getMockEmployees = (lang: 'en' | 'zh') => {
  if (lang === 'zh') {
    return [
      { id: 'E001', name: '张三', position: '前台接待', participated: 5, passRate: 100 },
      { id: 'E002', name: '李四', position: '客房服务员', participated: 6, passRate: 83 },
      { id: 'E003', name: '王五', position: '餐厅服务员', participated: 4, passRate: 75 },
      { id: 'E004', name: '赵六', position: '安保专员', participated: 5, passRate: 100 },
      { id: 'E005', name: '陈七', position: '礼宾员', participated: 3, passRate: 66 },
    ];
  }
  return [
    { id: 'E001', name: 'John Doe', position: 'Front Desk Agent', participated: 5, passRate: 100 },
    { id: 'E002', name: 'Jane Smith', position: 'Room Attendant', participated: 6, passRate: 83 },
    { id: 'E003', name: 'Mike Johnson', position: 'F&B Server', participated: 4, passRate: 75 },
    { id: 'E004', name: 'Sarah Williams', position: 'Security Officer', participated: 5, passRate: 100 },
    { id: 'E005', name: 'David Brown', position: 'Concierge', participated: 3, passRate: 66 },
  ];
};

export const getMockProjects = (lang: 'en' | 'zh') => {
  if (lang === 'zh') {
    return [
      { id: 'P001', name: '标准客房清洁', department: '客房部', sopTemplate: '客房清洁SOP v2', participants: 45, passedCount: 38, passRate: 84 },
      { id: 'P002', name: '前台接待与投诉处理', department: '前厅部', sopTemplate: '前台接待SOP v1', participants: 30, passedCount: 28, passRate: 93 },
      { id: 'P003', name: '高级餐厅服务', department: '餐饮部', sopTemplate: '餐厅服务SOP v3', participants: 25, passedCount: 19, passRate: 76 },
      { id: 'P004', name: '紧急疏散演练', department: '安保部', sopTemplate: '紧急疏散SOP v1', participants: 60, passedCount: 59, passRate: 98 },
    ];
  }
  return [
    { id: 'P001', name: 'Standard Room Cleaning', department: 'Housekeeping', sopTemplate: 'Room Cleaning SOP v2', participants: 45, passedCount: 38, passRate: 84 },
    { id: 'P002', name: 'Front Desk & Complaints', department: 'Front Office', sopTemplate: 'Front Desk SOP v1', participants: 30, passedCount: 28, passRate: 93 },
    { id: 'P003', name: 'Fine Dining Service', department: 'F&B', sopTemplate: 'Dining Service SOP v3', participants: 25, passedCount: 19, passRate: 76 },
    { id: 'P004', name: 'Emergency Evacuation', department: 'Security', sopTemplate: 'Evacuation SOP v1', participants: 60, passedCount: 59, passRate: 98 },
  ];
};

export const getMockSOPs = (lang: 'en' | 'zh') => {
  if (lang === 'zh') {
    return [
      { id: 'S001', name: '客房清洁SOP v2', position: '客房服务员', participants: 45, passedCount: 38, passRate: 84 },
      { id: 'S002', name: '前台接待SOP v1', position: '前台接待', participants: 30, passedCount: 28, passRate: 93 },
      { id: 'S003', name: '餐厅服务SOP v3', position: '餐厅服务员', participants: 25, passedCount: 19, passRate: 76 },
      { id: 'S004', name: '紧急疏散SOP v1', position: '全体员工', participants: 120, passedCount: 115, passRate: 95 },
      { id: 'S005', name: '过敏原处理SOP v2', position: '餐厅服务员', participants: 25, passedCount: 20, passRate: 80 },
    ];
  }
  return [
    { id: 'S001', name: 'Room Cleaning SOP v2', position: 'Room Attendant', participants: 45, passedCount: 38, passRate: 84 },
    { id: 'S002', name: 'Front Desk SOP v1', position: 'Front Desk Agent', participants: 30, passedCount: 28, passRate: 93 },
    { id: 'S003', name: 'Dining Service SOP v3', position: 'F&B Server', participants: 25, passedCount: 19, passRate: 76 },
    { id: 'S004', name: 'Evacuation SOP v1', position: 'All Staff', participants: 120, passedCount: 115, passRate: 95 },
    { id: 'S005', name: 'Allergen Handling SOP v2', position: 'F&B Server', participants: 25, passedCount: 20, passRate: 80 },
  ];
};

export const getEmployeeDetails = (lang: 'en' | 'zh', empId: string) => {
  if (lang === 'zh') {
    return [
      { id: 'D001', projectName: '标准客房清洁', score: 92, status: '通过', date: '2026-03-15' },
      { id: 'D002', projectName: '前台接待与投诉处理', score: 85, status: '通过', date: '2026-03-20' },
      { id: 'D003', projectName: '高级餐厅服务', score: 76, status: '未通过', date: '2026-04-05' },
    ];
  }
  return [
    { id: 'D001', projectName: 'Standard Room Cleaning', score: 92, status: 'Passed', date: '2026-03-15' },
    { id: 'D002', projectName: 'Front Desk & Complaints', score: 85, status: 'Passed', date: '2026-03-20' },
    { id: 'D003', projectName: 'Fine Dining Service', score: 76, status: 'Failed', date: '2026-04-05' },
  ];
};

export const getProjectDetails = (lang: 'en' | 'zh', projectId: string) => {
  if (lang === 'zh') {
    return [
      { id: 'E001', empName: '张三', empId: 'E001', score: 92, status: '通过', date: '2026-03-15' },
      { id: 'E002', empName: '李四', empId: 'E002', score: 85, status: '通过', date: '2026-03-15' },
      { id: 'E003', empName: '王五', empId: 'E003', score: 76, status: '未通过', date: '2026-03-15' },
    ];
  }
  return [
    { id: 'E001', empName: 'John Doe', empId: 'E001', score: 92, status: 'Passed', date: '2026-03-15' },
    { id: 'E002', empName: 'Jane Smith', empId: 'E002', score: 85, status: 'Passed', date: '2026-03-15' },
    { id: 'E003', empName: 'Mike Johnson', empId: 'E003', score: 76, status: 'Failed', date: '2026-03-15' },
  ];
};

export const getSOPDetails = (lang: 'en' | 'zh', sopId: string) => {
  if (lang === 'zh') {
    return [
      { id: 'E001', empName: '张三', empId: 'E001', projectName: '标准客房清洁', score: 92, status: '通过', date: '2026-03-15' },
      { id: 'E002', empName: '李四', empId: 'E002', projectName: '标准客房清洁', score: 85, status: '通过', date: '2026-03-15' },
      { id: 'E003', empName: '王五', empId: 'E003', projectName: '高级客房清洁', score: 76, status: '未通过', date: '2026-03-18' },
    ];
  }
  return [
    { id: 'E001', empName: 'John Doe', empId: 'E001', projectName: 'Standard Room Cleaning', score: 92, status: 'Passed', date: '2026-03-15' },
    { id: 'E002', empName: 'Jane Smith', empId: 'E002', projectName: 'Standard Room Cleaning', score: 85, status: 'Passed', date: '2026-03-15' },
    { id: 'E003', empName: 'Mike Johnson', empId: 'E003', projectName: 'Advanced Room Cleaning', score: 76, status: 'Failed', date: '2026-03-18' },
  ];
};

export const getAssessmentAttempts = (lang: 'en' | 'zh', assessmentId: string) => {
  if (lang === 'zh') {
    return [
      { 
        id: 'ATT001', 
        attemptNumber: 1, 
        score: 75, 
        status: '未通过', 
        date: '2026-03-10', 
        evaluator: '王经理 (主管)', 
        feedback: '细节处理不够到位，需要注意床铺平整度。',
        duration: '32分钟',
        strengths: ['服务态度好', '流程熟悉'],
        weaknesses: ['床铺平整度', '卫生间死角']
      },
      { 
        id: 'ATT002', 
        attemptNumber: 2, 
        score: 92, 
        status: '通过', 
        date: '2026-03-15', 
        evaluator: '王经理 (主管)', 
        feedback: '进步很大，完全符合标准。',
        duration: '28分钟',
        strengths: ['床铺平整度', '卫生间清洁', '时间控制'],
        weaknesses: ['无明显不足']
      },
    ];
  }
  return [
    { 
      id: 'ATT001', 
      attemptNumber: 1, 
      score: 75, 
      status: 'Failed', 
      date: '2026-03-10', 
      evaluator: 'Jane Smith (Supervisor)', 
      feedback: 'Details were missed, pay attention to bed neatness.',
      duration: '32 mins',
      strengths: ['Good attitude', 'Familiar with process'],
      weaknesses: ['Bed neatness', 'Bathroom corners']
    },
    { 
      id: 'ATT002', 
      attemptNumber: 2, 
      score: 92, 
      status: 'Passed', 
      date: '2026-03-15', 
      evaluator: 'Jane Smith (Supervisor)', 
      feedback: 'Great improvement, perfectly meets the standard.',
      duration: '28 mins',
      strengths: ['Bed neatness', 'Bathroom cleanliness', 'Time management'],
      weaknesses: ['No obvious weaknesses']
    },
  ];
};

