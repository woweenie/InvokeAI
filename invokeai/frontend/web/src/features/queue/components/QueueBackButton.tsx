import type { ChakraProps } from '@chakra-ui/react';
import GreyscaleInvokeAIIcon from 'common/components/GreyscaleInvokeAIIcon';
import { useQueueBack } from 'features/queue/hooks/useQueueBack';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import QueueButton from './common/QueueButton';
import EnqueueButtonTooltip from './QueueButtonTooltip';

type Props = {
  asIconButton?: boolean;
  sx?: ChakraProps['sx'];
};

const QueueBackButton = ({ asIconButton, sx }: Props) => {
  const { t } = useTranslation();
  const { queueBack, isLoading, isDisabled } = useQueueBack();
  return (
    <QueueButton
      asIconButton={asIconButton}
      colorScheme="accent"
      label={t('parameters.invoke.invoke')}
      isDisabled={isDisabled}
      isLoading={isLoading}
      onClick={queueBack}
      tooltip={<EnqueueButtonTooltip />}
      sx={sx}
      icon={asIconButton ? <GreyscaleInvokeAIIcon /> : undefined}
    />
  );
};

export default memo(QueueBackButton);
