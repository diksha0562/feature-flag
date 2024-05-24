import React, { useState, useEffect, useMemo } from 'react';
import { Table, Input, Button, Space, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { generateMockJobs } from './helper.ts';

interface Job {
  key: number;
  id: number;
  title: string;
  description: string;
  skills: string[];
  minSalary: number;
}

const FreelancerJobListingPage: React.FC = () => {

  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);

  useEffect(() => {
    // Fetch jobs data when component mounts (mock data for demonstration)
    fetchMockData()
  }, []);

  async function fetchMockData() {
    const mockJobs: Job[] = await generateMockJobs(1000)
    
    setFilteredJobs(mockJobs);
  }



  const getColumnSearchProps = (dataIndex: string) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value: any, record: any) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible: boolean) => {
      if (visible) {
        setTimeout(() => document.getElementById('search-input')?.select(), 100);
      }
    },
  });

  const handleSearch = (selectedKeys: React.Key[], confirm: () => void, dataIndex: string) => {
    console.log('selectedKeys', selectedKeys, dataIndex)
    confirm();
    // setSearchText(selectedKeys[0]? selectedKeys[0].toString(): "");
    // setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    // setSearchText('');
  };

  const handleQuickApply = (record: Job) => {
    // Logic for quick apply
    message.success(`Quick apply to job "${record.title}"`);
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      ...getColumnSearchProps('title'),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ...getColumnSearchProps('description'),
    },
    {
      title: 'Skills',
      dataIndex: 'skills',
      key: 'skills',
      ...getColumnSearchProps('skills'),
      render: (skills: string[]) => skills.join(', '),
    },
    {
      title: 'Min Salary',
      dataIndex: 'minSalary',
      key: 'minSalary',
      ...getColumnSearchProps('minSalary'),
      sorter: (a: Job, b: Job) => a.minSalary - b.minSalary,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: Job) => (
        <Button type="primary" onClick={() => handleQuickApply(record)}>Quick Apply</Button>
      ),
    },
  ];

  const handleChange = (pagination, filters, sorter,extra)=>{
    console.log('pagination, filters, sorter,extra',pagination, filters, sorter,extra);
  }

  return (
    <div>
      <Table columns={columns} dataSource={filteredJobs} onChange={handleChange}/>
    </div>
  );
};

export default FreelancerJobListingPage;