import { InvIconButton } from 'common/components/InvIconButton/InvIconButton';
import { InvTooltip } from 'common/components/InvTooltip/InvTooltip';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { FaCode } from 'react-icons/fa';

type Props = {
  isOpen: boolean;
  onOpen: () => void;
};

const ShowDynamicPromptsPreviewButton = (props: Props) => {
  const { onOpen, isOpen } = props;
  const { t } = useTranslation();
  return (
    <InvTooltip label={t('embedding.addEmbedding')}>
      <InvIconButton
        size="sm"
        variant="promptOverlay"
        isDisabled={isOpen}
        aria-label={t('embedding.addEmbedding')}
        icon={<FaCode />}
        onClick={onOpen}
        pos="absolute"
        insetBlockStart={0}
        insetInlineEnd={0}
      />
    </InvTooltip>
  );
};

export default memo(AddEmbeddingButton);
