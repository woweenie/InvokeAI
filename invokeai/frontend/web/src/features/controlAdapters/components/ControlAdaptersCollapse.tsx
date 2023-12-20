import { Divider, Flex } from '@chakra-ui/react';
import { createMemoizedSelector } from 'app/store/createMemoizedSelector';
import { stateSelector } from 'app/store/store';
import { useAppSelector } from 'app/store/storeHooks';
import { InvButton, InvButtonGroup } from 'common/components';
import IAICollapse from 'common/components/IAICollapse';
import ControlAdapterConfig from 'features/controlAdapters/components/ControlAdapterConfig';
import { useAddControlAdapter } from 'features/controlAdapters/hooks/useAddControlAdapter';
import {
  selectAllControlNets,
  selectAllIPAdapters,
  selectAllT2IAdapters,
  selectControlAdapterIds,
  selectValidControlNets,
  selectValidIPAdapters,
  selectValidT2IAdapters,
} from 'features/controlAdapters/store/controlAdaptersSlice';
import { useFeatureStatus } from 'features/system/hooks/useFeatureStatus';
import { Fragment, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { FaPlus } from 'react-icons/fa';

const selector = createMemoizedSelector(
  [stateSelector],
  ({ controlAdapters }) => {
    const activeLabel: string[] = [];
    let isError = false;

    const enabledIPAdapterCount = selectAllIPAdapters(controlAdapters).filter(
      (ca) => ca.isEnabled
    ).length;
    const validIPAdapterCount = selectValidIPAdapters(controlAdapters).length;
    if (enabledIPAdapterCount > 0) {
      activeLabel.push(`${enabledIPAdapterCount} IP`);
    }
    if (enabledIPAdapterCount > validIPAdapterCount) {
      isError = true;
    }

    const enabledControlNetCount = selectAllControlNets(controlAdapters).filter(
      (ca) => ca.isEnabled
    ).length;
    const validControlNetCount = selectValidControlNets(controlAdapters).length;
    if (enabledControlNetCount > 0) {
      activeLabel.push(`${enabledControlNetCount} ControlNet`);
    }
    if (enabledControlNetCount > validControlNetCount) {
      isError = true;
    }

    const enabledT2IAdapterCount = selectAllT2IAdapters(controlAdapters).filter(
      (ca) => ca.isEnabled
    ).length;
    const validT2IAdapterCount = selectValidT2IAdapters(controlAdapters).length;
    if (enabledT2IAdapterCount > 0) {
      activeLabel.push(`${enabledT2IAdapterCount} T2I`);
    }
    if (enabledT2IAdapterCount > validT2IAdapterCount) {
      isError = true;
    }

    const controlAdapterIds =
      selectControlAdapterIds(controlAdapters).map(String);

    return {
      controlAdapterIds,
      activeLabel: activeLabel.join(', '),
      isError, // TODO: Add some visual indicator that the control adapters are in an error state
    };
  }
);

const ControlAdaptersCollapse = () => {
  const { t } = useTranslation();
  const { controlAdapterIds, activeLabel } = useAppSelector(selector);
  const isControlNetDisabled = useFeatureStatus('controlNet').isFeatureDisabled;

  const [addControlNet, isAddControlNetDisabled] =
    useAddControlAdapter('controlnet');
  const [addIPAdapter, isAddIPAdapterDisabled] =
    useAddControlAdapter('ip_adapter');
  const [addT2IAdapter, isAddT2IAdapterDisabled] =
    useAddControlAdapter('t2i_adapter');

  if (isControlNetDisabled) {
    return null;
  }

  return (
    <IAICollapse
      label={t('controlnet.controlAdapter_other')}
      activeLabel={activeLabel}
    >
      <Flex sx={{ flexDir: 'column', gap: 2 }}>
        <InvButtonGroup size="sm" w="full" justifyContent="space-between">
          <InvButton
            tooltip={t('controlnet.addControlNet')}
            leftIcon={<FaPlus />}
            onClick={addControlNet}
            data-testid="add controlnet"
            flexGrow={1}
            isDisabled={isAddControlNetDisabled}
          >
            {t('common.controlNet')}
          </InvButton>
          <InvButton
            tooltip={t('controlnet.addIPAdapter')}
            leftIcon={<FaPlus />}
            onClick={addIPAdapter}
            data-testid="add ip adapter"
            flexGrow={1}
            isDisabled={isAddIPAdapterDisabled}
          >
            {t('common.ipAdapter')}
          </InvButton>
          <InvButton
            tooltip={t('controlnet.addT2IAdapter')}
            leftIcon={<FaPlus />}
            onClick={addT2IAdapter}
            data-testid="add t2i adapter"
            flexGrow={1}
            isDisabled={isAddT2IAdapterDisabled}
          >
            {t('common.t2iAdapter')}
          </InvButton>
        </InvButtonGroup>
        {controlAdapterIds.map((id, i) => (
          <Fragment key={id}>
            <Divider />
            <ControlAdapterConfig id={id} number={i + 1} />
          </Fragment>
        ))}
      </Flex>
    </IAICollapse>
  );
};

export default memo(ControlAdaptersCollapse);
