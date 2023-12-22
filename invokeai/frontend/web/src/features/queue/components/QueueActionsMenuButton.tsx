import { Box } from '@chakra-ui/layout';
import { useDisclosure } from '@chakra-ui/react';
import { InvBadge } from 'common/components/InvBadge/wrapper';
import { InvIconButton } from 'common/components/InvIconButton/InvIconButton';
import { InvMenuItem } from 'common/components/InvMenu/InvMenuItem';
import { InvMenuList } from 'common/components/InvMenu/InvMenuList';
import { InvMenu, InvMenuButton } from 'common/components/InvMenu/wrapper';
import { useCancelCurrentQueueItem } from 'features/queue/hooks/useCancelCurrentQueueItem';
import { usePauseProcessor } from 'features/queue/hooks/usePauseProcessor';
import { useResumeProcessor } from 'features/queue/hooks/useResumeProcessor';
import { useFeatureStatus } from 'features/system/hooks/useFeatureStatus';
import { useTranslation } from 'react-i18next';
import { FaPause, FaPlay, FaStream, FaTimes } from 'react-icons/fa';
import { useGetQueueStatusQuery } from 'services/api/endpoints/queue';

export const QueueActionsMenuButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();
  const isPauseEnabled = useFeatureStatus('pauseQueue').isFeatureEnabled;
  const isResumeEnabled = useFeatureStatus('resumeQueue').isFeatureEnabled;
  const { data: queueStatus } = useGetQueueStatusQuery();
  const {
    cancelQueueItem,
    isLoading: isLoadingCancelQueueItem,
    isDisabled: isDisabledCancelQueueItem,
  } = useCancelCurrentQueueItem();
  const {
    resumeProcessor,
    isLoading: isLoadingResumeProcessor,
    isDisabled: isDisabledResumeProcessor,
  } = useResumeProcessor();
  const {
    pauseProcessor,
    isLoading: isLoadingPauseProcessor,
    isDisabled: isDisabledPauseProcessor,
  } = usePauseProcessor();

  return (
    <Box pos="relative">
      <InvMenu
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        placement="bottom-end"
      >
        <InvMenuButton
          as={InvIconButton}
          aria-label="Queue Actions Menu"
          icon={<FaStream />}
        />
        <InvMenuList>
          <InvMenuItem
            isDestructive
            icon={<FaTimes size="16px" />}
            onClick={cancelQueueItem}
            isLoading={isLoadingCancelQueueItem}
            isDisabled={isDisabledCancelQueueItem}
          >
            {t('queue.cancelTooltip')}
          </InvMenuItem>
          {isResumeEnabled && (
            <InvMenuItem
              icon={<FaPlay size="14px" />}
              onClick={resumeProcessor}
              isLoading={isLoadingResumeProcessor}
              isDisabled={isDisabledResumeProcessor}
            >
              {t('queue.resumeTooltip')}
            </InvMenuItem>
          )}
          {isPauseEnabled && (
            <InvMenuItem
              icon={<FaPause size="14px" />}
              onClick={pauseProcessor}
              isLoading={isLoadingPauseProcessor}
              isDisabled={isDisabledPauseProcessor}
            >
              {t('queue.pauseTooltip')}
            </InvMenuItem>
          )}
        </InvMenuList>
      </InvMenu>
      {queueStatus && (
        <InvBadge
          pos="absolute"
          insetInlineStart={-3}
          insetBlockStart={-1.5}
          colorScheme="yellow"
          zIndex="docked"
        >
          {queueStatus.queue.pending + queueStatus.queue.in_progress}
        </InvBadge>
      )}
    </Box>
  );
};