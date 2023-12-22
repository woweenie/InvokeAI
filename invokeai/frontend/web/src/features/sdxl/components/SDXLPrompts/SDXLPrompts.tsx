import { Flex } from '@chakra-ui/react';
import { useAppSelector } from 'app/store/storeHooks';
import { ParamNegativePrompt } from 'features/parameters/components/Core/ParamNegativePrompt';
import { ParamPositivePrompt } from 'features/parameters/components/Core/ParamPositivePrompt';

import { ParamSDXLNegativeStylePrompt } from './ParamSDXLNegativeStylePrompt';
import { ParamSDXLPositiveStylePrompt } from './ParamSDXLPositiveStylePrompt';

export const SDXLPrompts = () => {
  const shouldConcatSDXLStylePrompt = useAppSelector(
    (state) => state.sdxl.shouldConcatSDXLStylePrompt
  );
  return (
    <Flex flexDir="column" gap={2} pos="relative">
      <ParamPositivePrompt />
      {!shouldConcatSDXLStylePrompt && <ParamSDXLPositiveStylePrompt />}
      <ParamNegativePrompt />
      {!shouldConcatSDXLStylePrompt && <ParamSDXLNegativeStylePrompt />}
    </Flex>
  );
};
