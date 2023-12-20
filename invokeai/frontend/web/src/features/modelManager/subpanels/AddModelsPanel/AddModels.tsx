import { Flex } from '@chakra-ui/react';
import IAIButton from 'common/components/IAIButton';
import { useCallback, useState } from 'react';
import AdvancedAddModels from './AdvancedAddModels';
import SimpleAddModels from './SimpleAddModels';
import { useTranslation } from 'react-i18next';
import { InvButtonGroup } from 'common/components';

export default function AddModels() {
  const { t } = useTranslation();
  const [addModelMode, setAddModelMode] = useState<'simple' | 'advanced'>(
    'simple'
  );
  const handleAddModelSimple = useCallback(() => setAddModelMode('simple'), []);
  const handleAddModelAdvanced = useCallback(
    () => setAddModelMode('advanced'),
    []
  );
  return (
    <Flex
      flexDirection="column"
      width="100%"
      overflow="scroll"
      maxHeight={window.innerHeight - 250}
      gap={4}
    >
      <InvButtonGroup>
        <IAIButton
          size="sm"
          isChecked={addModelMode == 'simple'}
          onClick={handleAddModelSimple}
        >
          {t('common.simple')}
        </IAIButton>
        <IAIButton
          size="sm"
          isChecked={addModelMode == 'advanced'}
          onClick={handleAddModelAdvanced}
        >
          {t('common.advanced')}
        </IAIButton>
      </InvButtonGroup>
      <Flex
        sx={{
          p: 4,
          borderRadius: 4,
          background: 'base.800',
        }}
      >
        {addModelMode === 'simple' && <SimpleAddModels />}
        {addModelMode === 'advanced' && <AdvancedAddModels />}
      </Flex>
    </Flex>
  );
}
