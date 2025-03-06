import { Api } from '@/shared/services/api-client';
import { Service } from '@prisma/client';
import React from 'react';

export const useServices = () => {
  const [fetchedServices, setFetchedServices] = React.useState<Service[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchServices() {
      try {
        setLoading(true);
        const fetchedData = await Api.services.getAll();

        if (Array.isArray(fetchedData)) {
          setFetchedServices(fetchedData);
        } else {
          console.error(
            'fetchServices: получены некорректные данные',
            fetchedData
          );
        }
      } catch (error) {
        console.error('Ошибка загрузки сервисов:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchServices();
  }, []);

  return {
    services: fetchedServices,
  };
};
