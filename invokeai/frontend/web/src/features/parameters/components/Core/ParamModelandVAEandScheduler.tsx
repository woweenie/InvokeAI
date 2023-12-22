import { Box, Flex } from '@chakra-ui/react';
import ParamMainModelSelect from 'features/parameters/components/MainModel/ParamMainModelSelect';
import ParamVAEModelSelect from 'features/parameters/components/VAEModel/ParamVAEModelSelect';
import ParamVAEPrecision from 'features/parameters/components/VAEModel/ParamVAEPrecision';
import { useFeatureStatus } from 'features/system/hooks/useFeatureStatus';
import { memo } from 'react';

import ParamScheduler from './ParamScheduler';

const ParamModelandVAEandScheduler = () => {
  const isVaeEnabled = useFeatureStatus('vae').isFeatureEnabled;

  return (
    <Flex gap={3} w="full" flexWrap={isVaeEnabled ? 'wrap' : 'nowrap'}>
      <Box w="full">
        <ParamMainModelSelect />
      </Box>
      <Box w="full">
        <ParamScheduler />
      </Box>
      {isVaeEnabled && (
        <Flex w="full" gap={3}>
          <ParamVAEModelSelect />
          <ParamVAEPrecision />
        </Flex>
      )}
    </Flex>
  );
};

export default memo(ParamModelandVAEandScheduler);