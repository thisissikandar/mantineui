import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchUserData = async (id:string) => {
  const { data } = await axios.get(`https://api.spacexdata.com/v4/capsules/${id}`);
  return data;
};

const fetchCompany = async () => {
  const { data } = await axios.get('https://api.spacexdata.com/v4/company');
  return data;
};

export default function useCapsuleDetail(id:string) {
  const capsuleQuery = useQuery({
    queryKey: ['userdetails', id],
    queryFn: () => fetchUserData(id),
  });

  const companyQuery = useQuery({
    queryKey: ['company'],
    queryFn: fetchCompany,
    enabled: !!capsuleQuery.data, 
  });

  return {
    capsule: capsuleQuery.data,
    company: companyQuery.data,
    isLoading: capsuleQuery.isLoading || companyQuery.isLoading,
  };
}